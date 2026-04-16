import { useContext, useState } from "react";
import { LanguageContext } from "../../Language";
import PurchaseModal from "../Purchase/PurchaseModal";

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
  const [selectedProduct, setSelectedProduct] = useState(null);
  const isFrench = userLanguage === "fr";

  return (
    <section id="tour" className="bg-gray-900 px-6 py-12">
      <div className="max-w-3xl mx-auto">
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
            ? "Paiement sécurisé via PayPal. Lien de téléchargement envoyé par email, valide 7 jours."
            : "Secure payment via PayPal. Download link sent by email, valid for 7 days."}
        </p>
      </div>

      {selectedProduct && (
        <PurchaseModal
          product={selectedProduct}
          lang={userLanguage}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </section>
  );
}

export default AudioBookLink;
