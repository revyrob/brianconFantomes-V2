import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

const PRODUCT_LABELS = {
  fr: { fr: "🇫🇷 Version Française", en: "🇫🇷 French Version" },
  en: { fr: "🇬🇧 Version Anglaise", en: "🇬🇧 English Version" },
  both: { fr: "🇫🇷🇬🇧 Les Deux", en: "🇫🇷🇬🇧 Both Languages" },
};

const PRICES = { fr: "5", en: "5", both: "8" };

function PurchaseModal({ product, lang, onClose }) {
  const [email, setEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | processing | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const isFrench = lang === "fr";
  const productLabel = PRODUCT_LABELS[product]?.[lang] || product;
  const price = PRICES[product];

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  const emailError =
    emailTouched && email && !isValidEmail(email)
      ? isFrench
        ? "Format d'email invalide"
        : "Invalid email format"
      : "";

  const showPayPal = isValidEmail(email) && status === "idle";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-gray-800 rounded-2xl w-full max-w-md p-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-400 hover:text-white text-3xl leading-none"
          aria-label="Close"
        >
          ×
        </button>

        <h2 className="text-white font-oswald text-2xl mb-1">{productLabel}</h2>
        <p className="text-yellow-300 text-4xl font-bold mb-6">€{price}</p>

        {status === "idle" && (
          <>
            <label className="block text-gray-300 text-sm mb-2">
              {isFrench
                ? "Votre email — nous enverrons le lien de téléchargement ici"
                : "Your email — we'll send your download link here"}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              placeholder="exemple@email.com"
              className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 mb-1 focus:outline-none focus:border-yellow-400 transition-colors"
              autoFocus
            />
            {emailError && (
              <p className="text-red-400 text-sm mb-3">{emailError}</p>
            )}

            {showPayPal ? (
              <div className="mt-5">
                <PayPalButtons
                  style={{ layout: "vertical", color: "gold", shape: "pill", label: "pay" }}
                  createOrder={async () => {
                    const res = await fetch(
                      "/.netlify/functions/paypal-create-order",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ product }),
                      }
                    );
                    const data = await res.json();
                    if (!data.id) throw new Error("Order creation failed");
                    return data.id;
                  }}
                  onApprove={async (data) => {
                    setStatus("processing");
                    try {
                      const res = await fetch(
                        "/.netlify/functions/paypal-capture-order",
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            orderID: data.orderID,
                            product,
                            email,
                          }),
                        }
                      );
                      const result = await res.json();
                      if (result.success) {
                        setStatus("success");
                      } else {
                        throw new Error(result.error || "Capture failed");
                      }
                    } catch (err) {
                      setStatus("error");
                      setErrorMsg(err.message);
                    }
                  }}
                  onError={() => {
                    setStatus("error");
                    setErrorMsg(
                      isFrench
                        ? "Erreur PayPal. Veuillez réessayer."
                        : "PayPal error. Please try again."
                    );
                  }}
                />
              </div>
            ) : (
              !email && (
                <p className="text-gray-500 text-sm mt-4 text-center">
                  {isFrench
                    ? "↑ Entrez votre email pour afficher le paiement"
                    : "↑ Enter your email to show payment options"}
                </p>
              )
            )}
          </>
        )}

        {status === "processing" && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4" />
            <p className="text-gray-300">
              {isFrench ? "Traitement en cours…" : "Processing…"}
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-xl font-bold mb-3">
              {isFrench ? "Paiement confirmé !" : "Payment confirmed!"}
            </h3>
            <p className="text-gray-300 text-sm mb-2">
              {isFrench
                ? `Un email a été envoyé à `
                : `An email has been sent to `}
              <span className="text-yellow-300">{email}</span>
              {isFrench
                ? ` avec votre lien de téléchargement (valide 7 jours).`
                : ` with your download link (valid 7 days).`}
            </p>
            <p className="text-gray-500 text-xs mt-2">
              {isFrench
                ? "Vérifiez vos spams si vous ne le recevez pas."
                : "Check your spam folder if you don't see it."}
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">❌</div>
            <p className="text-red-400 mb-2">
              {isFrench
                ? "Une erreur s'est produite."
                : "An error occurred."}
            </p>
            <p className="text-gray-500 text-xs mb-4">{errorMsg}</p>
            <button
              onClick={() => { setStatus("idle"); setErrorMsg(""); }}
              className="text-yellow-400 underline text-sm mr-4"
            >
              {isFrench ? "Réessayer" : "Try again"}
            </button>
            <a
              href="mailto:brianconfantomes@gmail.com"
              className="text-gray-400 text-xs"
            >
              brianconfantomes@gmail.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseModal;
