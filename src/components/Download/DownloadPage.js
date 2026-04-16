import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/logoskull.png";

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

function ChapterList({ lang, token, label, subtitle }) {
  return (
    <div className="bg-gray-800 rounded-xl p-6 mb-4">
      <h2 className="text-white text-xl font-bold mb-1">{label}</h2>
      <p className="text-gray-400 text-sm mb-5">{subtitle}</p>
      {CHAPTER_NAMES.map((name, i) => (
        <a
          key={i}
          href={`/.netlify/functions/download-audio?token=${token}&lang=${lang}&chapter=${i + 1}`}
          download
          className="flex items-center justify-between bg-gray-700 hover:bg-gray-600 rounded-lg px-4 py-3 mb-2 transition-colors group"
        >
          <span className="text-sm text-gray-200">
            <span className="text-yellow-400 font-mono mr-3 text-xs">
              Ch.{i + 1}
            </span>
            {name}
          </span>
          <span className="text-gray-500 text-xs group-hover:text-yellow-400 transition-colors">
            ⬇ MP3
          </span>
        </a>
      ))}
    </div>
  );
}

function DownloadPage() {
  const [status, setStatus] = useState("loading"); // loading | ready | expired | invalid | error
  const [product, setProduct] = useState(null);
  const [expiresAt, setExpiresAt] = useState(null);

  const token = new URLSearchParams(window.location.search).get("token");

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    fetch(`/.netlify/functions/validate-token?token=${token}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error === "expired") {
          setStatus("expired");
        } else if (data.error) {
          setStatus("invalid");
        } else {
          setProduct(data.product);
          setExpiresAt(data.expiresAt);
          setStatus("ready");
        }
      })
      .catch(() => setStatus("error"));
  }, [token]);

  const expiryLabel = expiresAt
    ? new Date(expiresAt).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-4">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <a href="/">
            <img
              src={logo}
              alt="Briançon Fantômes"
              className="w-24 mx-auto mb-3"
            />
          </a>
          <h1 className="font-creepster text-3xl text-yellow-300">
            Briançon Fantômes
          </h1>
        </div>

        {status === "loading" && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto" />
          </div>
        )}

        {status === "invalid" && (
          <div className="text-center bg-gray-800 rounded-xl p-8">
            <div className="text-4xl mb-3">🔗</div>
            <p className="text-red-400 text-lg font-semibold mb-2">
              Lien invalide / Invalid link
            </p>
            <p className="text-gray-400 text-sm">
              Ce lien n'existe pas ou a déjà été utilisé.
              <br />
              This link does not exist or has already been used.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              <a
                href="mailto:brianconfantomes@gmail.com"
                className="text-yellow-400 hover:underline"
              >
                brianconfantomes@gmail.com
              </a>
            </p>
          </div>
        )}

        {status === "expired" && (
          <div className="text-center bg-gray-800 rounded-xl p-8">
            <div className="text-4xl mb-3">⏱</div>
            <p className="text-red-400 text-lg font-semibold mb-2">
              Lien expiré / Link expired
            </p>
            <p className="text-gray-400 text-sm">
              Ce lien de téléchargement était valide 7 jours et a expiré.
              <br />
              This download link was valid for 7 days and has now expired.
            </p>
            <p className="text-gray-500 text-sm mt-4">
              Contactez :{" "}
              <a
                href="mailto:brianconfantomes@gmail.com"
                className="text-yellow-400 hover:underline"
              >
                brianconfantomes@gmail.com
              </a>
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center bg-gray-800 rounded-xl p-8">
            <p className="text-red-400 mb-2">Erreur serveur / Server error</p>
            <p className="text-gray-500 text-sm">
              <a
                href="mailto:brianconfantomes@gmail.com"
                className="text-yellow-400"
              >
                brianconfantomes@gmail.com
              </a>
            </p>
          </div>
        )}

        {status === "ready" && (
          <>
            <div className="text-center mb-6">
              <p className="text-gray-400 text-sm">
                ⏱{" "}
                <span className="text-gray-300">
                  Lien valide jusqu'au / Link valid until:
                </span>{" "}
                <span className="text-yellow-300 font-medium">{expiryLabel}</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Téléchargez les fichiers sur wifi avant votre balade. /
                Download on wifi before your walk.
              </p>
            </div>

            {(product === "fr" || product === "both") && (
              <ChapterList
                lang="fr"
                token={token}
                label="🇫🇷 Version Française"
                subtitle="Téléchargez chaque chapitre. Cliquez sur un chapitre pour lancer le téléchargement."
              />
            )}

            {(product === "en" || product === "both") && (
              <ChapterList
                lang="en"
                token={token}
                label="🇬🇧 English Version"
                subtitle="Download each chapter. Click a chapter to start the download."
              />
            )}

            <div className="text-center mt-6">
              <a
                href="/"
                className="text-gray-500 text-sm hover:text-gray-300 transition-colors"
              >
                ← Retour au site / Back to site
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default DownloadPage;
