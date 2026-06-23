import { useContext, useState, useEffect } from "react";
import { LanguageContext } from "../../Language";
import { useAuth } from "../../hooks/useAuth";
import PurchaseModal from "../Purchase/PurchaseModal";
import AudioPlayer from "../AudioPlayer/AudioPlayer";

const PRODUCTS = [
  {
    id: "fr",
    flag: "🇫🇷",
    labelFr: "Version Française",
    labelEn: "French Version",
    price: "5",
  },
  {
    id: "en",
    flag: "🇬🇧",
    labelFr: "Version Anglaise",
    labelEn: "English Version",
    price: "5",
  },
  {
    id: "both",
    flag: "🇫🇷🇬🇧",
    labelFr: "Les Deux",
    labelEn: "Both Languages",
    price: "8",
    saveFr: "Économisez €2 !",
    saveEn: "Save €2!",
  },
];

function AudioBookLink() {
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const { session, loading, isPaid, isExpired, profile, refreshProfile } =
    useAuth();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isFrench = userLanguage === "fr";

  // After OAuth redirect: restore the product the user was purchasing
  useEffect(() => {
    if (!loading && session) {
      const pending = sessionStorage.getItem("pendingProduct");
      if (pending) {
        sessionStorage.removeItem("pendingProduct");
        setSelectedProduct(pending);
      }
    }
  }, [loading, session]);

  const expiryLabel = profile?.end_date
    ? new Date(profile.end_date).toLocaleDateString(
        isFrench ? "fr-FR" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" },
      )
    : "";

  return (
    <section id="tour" className="bg-gray-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Book cover + description — always visible */}
        <div className="grid grid-cols-[auto_1fr] gap-8 items-start mb-10">
          <img
            className="w-40 md:w-48 rounded-lg shadow-lg"
            src={dictionary.book.img}
            alt={isFrench ? "Couverture du livre audio" : "Audio book cover"}
          />
          <div className="flex flex-col justify-center">
            <h1 className="text-white font-oswald text-2xl md:text-3xl border-b-2 border-gray-600 pb-2 mb-3">
              {dictionary.book.title}
            </h1>
            <p className="text-gray-300 font-oswald text-base">
              {dictionary.book.descrip}
            </p>
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400" />
          </div>
        )}

        {/* Paid + active — show the audio player */}
        {!loading && isPaid && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-white font-oswald text-xl">
                {isFrench ? "Vos chapitres audio" : "Your audio chapters"}
              </h2>
              <span className="text-gray-500 text-xs">
                {isFrench ? `Accès jusqu'au ` : "Access until "}
                <span className="text-yellow-400">{expiryLabel}</span>
              </span>
            </div>
            <AudioPlayer product={profile.product} />
            {/* <AudioPlayer product={"en"} /> */}
          </>
        )}

        {/* Expired — show message + renewal */}
        {!loading && isExpired && (
          <div className="bg-gray-800 rounded-xl p-6 mb-6 text-center">
            <p className="text-red-400 font-semibold mb-1">
              {isFrench ? "Votre accès a expiré." : "Your access has expired."}
            </p>
            <p className="text-gray-400 text-sm mb-4">
              {isFrench
                ? `Il a expiré le ${expiryLabel}. Achetez à nouveau pour 7 jours d'accès.`
                : `It expired on ${expiryLabel}. Purchase again for 7 days of access.`}
            </p>
          </div>
        )}

        {/* Guest or expired — show buy cards */}

        {!loading && !isPaid && (
          <>
            <h2 className="text-gray-400 text-center text-xs uppercase tracking-widest mb-5">
              {isFrench ? "Achetez directement" : "Buy directly"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PRODUCTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p.id)}
                  className="bg-gray-800 hover:bg-gray-700 border border-gray-700 hover:border-yellow-400 rounded-xl p-6 text-center transition-all cursor-pointer"
                >
                  <div className="text-3xl mb-2">{p.flag}</div>
                  <div className="text-white font-semibold text-sm mb-2">
                    {isFrench ? p.labelFr : p.labelEn}
                  </div>
                  <div className="text-yellow-300 text-3xl font-bold mb-1">
                    €{p.price}
                  </div>
                  {(isFrench ? p.saveFr : p.saveEn) && (
                    <div className="text-green-400 text-xs font-medium">
                      {isFrench ? p.saveFr : p.saveEn}
                    </div>
                  )}
                </button>
              ))}
            </div>

            <p className="text-gray-600 text-xs text-center mt-5">
              {isFrench
                ? "Paiement sécurisé via Stripe. Accès 7 jours, écoute hors ligne."
                : "Secure payment via Stripe. 7-day access, offline playback."}
            </p>
          </>
        )}
      </div>

      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSuccess={refreshProfile}
        />
      )}
    </section>
  );
}

export default AudioBookLink;
