import { useState, useRef, useEffect, useContext } from "react";
import { supabase } from "../../lib/supabase";
import { LanguageContext } from "../../Language";

const CHAPTER_NAMES = [
  "Porte de Pignerol",
  "Chemin de Ronde",
  "Chemin du Fort des Têtes",
  "Rue du Pont d'Asfeld",
  "Rue Domaine Chautard",
  "Place d'Armes",
  "Rue Mercerie",
  "Avenue Vauban",
  "Rue du Pont d'Asfeld (fin)",
];

const AUDIO_CACHE = "briancon-audio-v1";

function AudioPlayer({ product }) {
  const { userLanguage } = useContext(LanguageContext);
  const isFrenchUI = userLanguage === "fr";

  const [activeLang, setActiveLang] = useState(
    product === "en" ? "en" : "fr"
  );
  const [playingChapter, setPlayingChapter] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingChapter, setLoadingChapter] = useState(null);
  const [progress, setProgress] = useState(0);
  const [cachedChapters, setCachedChapters] = useState(new Set());

  const audioRef = useRef(null);
  const audioCacheRef = useRef(null);
  const objectUrlRef = useRef(null);

  // Open Cache API and check what's already downloaded
  useEffect(() => {
    caches.open(AUDIO_CACHE).then((cache) => {
      audioCacheRef.current = cache;
      cache.keys().then((keys) => {
        const cached = new Set(
          keys
            .map((req) => {
              const match = req.url.match(/\/audio\/((?:fr|en)\/\d+)/);
              return match ? match[1] : null;
            })
            .filter(Boolean)
        );
        setCachedChapters(cached);
      });
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // Stop playback when switching language
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPlayingChapter(null);
    setIsPlaying(false);
    setProgress(0);
  }, [activeLang]);

  async function handleChapterClick(chapter) {
    // Toggle play/pause for the current chapter
    if (playingChapter === chapter) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
      return;
    }

    setLoadingChapter(chapter);

    try {
      const cacheKey = `${activeLang}/${chapter}`;
      let audioUrl;

      // Check Cache API first (offline support)
      const cached = await audioCacheRef.current?.match(`/audio/${cacheKey}`);
      if (cached) {
        const blob = await cached.blob();
        audioUrl = URL.createObjectURL(blob);
      } else {
        // Get user's session token to call the function
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const res = await fetch(
          `/.netlify/functions/get-audio-url?lang=${activeLang}&chapter=${chapter}`,
          {
            headers: { Authorization: `Bearer ${session.access_token}` },
          }
        );

        if (!res.ok) {
          let errorMsg = `HTTP ${res.status}`;
          try {
            const err = await res.json();
            errorMsg = err.error || errorMsg;
          } catch {}
          throw new Error(errorMsg);
        }

        const { url } = await res.json();

        // Fetch audio and cache it for offline use
        const audioRes = await fetch(url);
        const audioBlob = await audioRes.blob();

        await audioCacheRef.current?.put(
          `/audio/${cacheKey}`,
          new Response(audioBlob.slice(), {
            headers: { "Content-Type": "audio/mpeg" },
          })
        );

        setCachedChapters((prev) => new Set([...prev, cacheKey]));
        audioUrl = URL.createObjectURL(audioBlob);
      }

      // Clean up previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
      objectUrlRef.current = audioUrl;

      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener("timeupdate", () => {
        if (audio.duration) setProgress(audio.currentTime / audio.duration);
      });
      audio.addEventListener("ended", () => {
        setPlayingChapter(null);
        setIsPlaying(false);
        setProgress(0);
      });

      await audio.play();
      setPlayingChapter(chapter);
      setIsPlaying(true);
    } catch (err) {
      console.error("Audio playback error:", err);
    } finally {
      setLoadingChapter(null);
    }
  }

  return (
    <div className="max-w-2xl mx-auto w-full">
      {/* Language tabs — only shown for 'both' purchases */}
      {product === "both" && (
        <div className="flex gap-2 mb-6">
          {["fr", "en"].map((l) => (
            <button
              key={l}
              onClick={() => setActiveLang(l)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-colors ${
                activeLang === l
                  ? "bg-yellow-400 text-gray-900"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {l === "fr" ? "🇫🇷 Français" : "🇬🇧 English"}
            </button>
          ))}
        </div>
      )}

      {/* Now playing bar */}
      {playingChapter && (
        <div className="bg-gray-700 rounded-xl p-4 mb-4 flex items-center gap-4">
          <button
            onClick={() => handleChapterClick(playingChapter)}
            className="bg-yellow-400 text-gray-900 rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 text-lg"
          >
            {isPlaying ? "⏸" : "▶"}
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate mb-1">
              Ch.{playingChapter} — {CHAPTER_NAMES[playingChapter - 1]}
            </p>
            <div className="w-full bg-gray-600 rounded-full h-1.5">
              <div
                className="bg-yellow-400 h-1.5 rounded-full transition-all"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Chapter list */}
      <div>
        {CHAPTER_NAMES.map((name, i) => {
          const chapter = i + 1;
          const isActive = playingChapter === chapter;
          const isLoading = loadingChapter === chapter;
          const isCached = cachedChapters.has(`${activeLang}/${chapter}`);

          return (
            <button
              key={chapter}
              onClick={() => handleChapterClick(chapter)}
              disabled={isLoading}
              className={`w-full flex items-center justify-between px-4 py-3 mb-2 rounded-lg transition-colors text-left border ${
                isActive
                  ? "bg-yellow-400/10 border-yellow-400/40 text-white"
                  : "bg-gray-700 hover:bg-gray-600 border-transparent text-gray-200"
              }`}
            >
              <span className="text-sm flex items-center gap-3 min-w-0">
                <span
                  className={`font-mono text-xs flex-shrink-0 ${
                    isActive ? "text-yellow-400" : "text-gray-500"
                  }`}
                >
                  Ch.{chapter}
                </span>
                <span className="truncate">{name}</span>
              </span>
              <span className="flex-shrink-0 ml-3 text-base">
                {isLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
                ) : isActive && isPlaying ? (
                  "⏸"
                ) : (
                  <span
                    className={isCached ? "text-yellow-400" : "text-gray-500"}
                    title={
                      isCached
                        ? isFrenchUI
                          ? "Disponible hors ligne"
                          : "Available offline"
                        : "▶"
                    }
                  >
                    {isCached ? "⬇▶" : "▶"}
                  </span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      <p className="text-gray-600 text-xs text-center mt-4">
        {isFrenchUI
          ? "📶 Les chapitres écoutés sont mis en cache automatiquement pour une utilisation hors ligne."
          : "📶 Played chapters are automatically cached for offline use."}
      </p>
    </div>
  );
}

export default AudioPlayer;
