import { useState, useEffect, useContext } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { supabase } from "../../lib/supabase";
import { LanguageContext } from "../../Language";

const PRODUCT_LABELS = {
  fr: { fr: "🇫🇷 Version Française", en: "🇫🇷 French Version" },
  en: { fr: "🇬🇧 Version Anglaise", en: "🇬🇧 English Version" },
  both: { fr: "🇫🇷🇬🇧 Les Deux", en: "🇫🇷🇬🇧 Both Languages" },
};
const PRICES = { fr: "5", en: "5", both: "8" };

// step: loading | auth | payment | processing | success | error
function PurchaseModal({ product, onClose, onSuccess }) {
  const { userLanguage } = useContext(LanguageContext);
  const isFr = userLanguage === "fr";

  const [step, setStep] = useState("loading");
  const [authMode, setAuthMode] = useState("register"); // register | login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [session, setSession] = useState(null);

  const productLabel = PRODUCT_LABELS[product]?.[userLanguage] || product;
  const price = PRICES[product];

  // Check if user is already logged in
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setSession(session);
        setStep("payment");
      } else {
        setStep("auth");
      }
    });
  }, []);

  async function handleOAuth(provider) {
    sessionStorage.setItem("pendingProduct", product);
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
    if (error) setAuthError(error.message);
  }

  async function handleAuth(e) {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);

    try {
      if (authMode === "register") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        if (data.session) {
          setSession(data.session);
          setStep("payment");
        } else {
          // Email confirmation is enabled — ask user to verify
          setAuthError(
            isFr
              ? "Vérifiez vos emails pour confirmer votre compte, puis revenez vous connecter."
              : "Check your email to confirm your account, then come back to sign in."
          );
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        setSession(data.session);
        setStep("payment");
      }
    } catch (err) {
      setAuthError(
        isFr
          ? err.message === "Invalid login credentials"
            ? "Email ou mot de passe incorrect."
            : err.message
          : err.message
      );
    } finally {
      setAuthLoading(false);
    }
  }

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

        {/* Header */}
        {step !== "success" && (
          <div className="mb-6">
            <p className="text-white font-oswald text-2xl">{productLabel}</p>
            <p className="text-yellow-300 text-4xl font-bold">€{price}</p>
          </div>
        )}

        {/* Loading */}
        {step === "loading" && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-yellow-400" />
          </div>
        )}

        {/* Step 1 — Auth */}
        {step === "auth" && (
          <>
            {/* Tabs */}
            <div className="flex mb-5 bg-gray-700 rounded-lg p-1">
              {["register", "login"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => { setAuthMode(mode); setAuthError(""); }}
                  className={`flex-1 py-2 rounded-md text-sm font-medium transition-colors ${
                    authMode === mode
                      ? "bg-gray-900 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {mode === "register"
                    ? isFr ? "Créer un compte" : "Create account"
                    : isFr ? "Se connecter" : "Sign in"}
                </button>
              ))}
            </div>

            <form onSubmit={handleAuth} className="space-y-3">
              <div>
                <label className="block text-gray-300 text-sm mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="exemple@email.com"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm mb-1">
                  {isFr ? "Mot de passe" : "Password"}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  placeholder={isFr ? "Minimum 6 caractères" : "Minimum 6 characters"}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>

              {authError && (
                <p className="text-red-400 text-sm">{authError}</p>
              )}

              <button
                type="submit"
                disabled={authLoading}
                className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-full mt-2 hover:bg-yellow-300 transition-colors disabled:opacity-60"
              >
                {authLoading
                  ? isFr ? "…" : "…"
                  : authMode === "register"
                  ? isFr ? "Créer mon compte" : "Create account"
                  : isFr ? "Se connecter" : "Sign in"}
              </button>
            </form>

            {/* OAuth divider */}
            <div className="relative flex items-center my-4">
              <div className="flex-grow border-t border-gray-600" />
              <span className="mx-3 text-gray-500 text-xs shrink-0">
                {isFr ? "ou continuer avec" : "or continue with"}
              </span>
              <div className="flex-grow border-t border-gray-600" />
            </div>

            {/* Google */}
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-900 font-medium py-3 rounded-full mb-3 hover:bg-gray-100 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.2l6.7-6.7C35.7 2.5 30.2 0 24 0 14.7 0 6.7 5.4 2.7 13.3l7.8 6.1C12.4 13 17.8 9.5 24 9.5z"/>
                <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.5 2.9-2.2 5.4-4.7 7l7.3 5.7c4.3-4 6.9-9.9 7.2-16.7z"/>
                <path fill="#FBBC05" d="M10.5 28.6A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.1.7-4.6l-7.8-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.8l7.9-6.2z"/>
                <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.3-5.7c-2 1.4-4.6 2.2-7.9 2.2-6.2 0-11.5-4.2-13.4-9.9l-7.9 6.2C6.7 42.6 14.7 48 24 48z"/>
              </svg>
              Google
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleOAuth("facebook")}
              className="w-full flex items-center justify-center gap-3 bg-[#1877F2] text-white font-medium py-3 rounded-full hover:bg-[#166FE5] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
              </svg>
              Facebook
            </button>

            <p className="text-gray-500 text-xs text-center mt-4">
              {isFr
                ? "🔒 Votre compte vous donne accès aux fichiers audio pendant 7 jours après l'achat."
                : "🔒 Your account gives access to the audio files for 7 days after purchase."}
            </p>
          </>
        )}

        {/* Step 2 — PayPal payment */}
        {step === "payment" && (
          <>
            {session && (
              <p className="text-gray-400 text-sm mb-4">
                {isFr ? "Connecté en tant que " : "Signed in as "}
                <span className="text-gray-200">{session.user.email}</span>
              </p>
            )}

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
                setStep("processing");
                try {
                  const res = await fetch(
                    "/.netlify/functions/paypal-capture-order",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        orderID: data.orderID,
                        product,
                        userToken: session.access_token,
                      }),
                    }
                  );
                  const result = await res.json();
                  if (result.success) {
                    setStep("success");
                    onSuccess?.();
                  } else {
                    throw new Error(result.error || "Capture failed");
                  }
                } catch (err) {
                  setStep("error");
                  setErrorMsg(err.message);
                }
              }}
              onError={() => {
                setStep("error");
                setErrorMsg(
                  isFr
                    ? "Erreur PayPal. Veuillez réessayer."
                    : "PayPal error. Please try again."
                );
              }}
            />
          </>
        )}

        {/* Processing */}
        {step === "processing" && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4" />
            <p className="text-gray-300">{isFr ? "Traitement…" : "Processing…"}</p>
          </div>
        )}

        {/* Success */}
        {step === "success" && (
          <div className="text-center py-4">
            <div className="text-5xl mb-4">✅</div>
            <h3 className="text-white text-xl font-bold mb-3">
              {isFr ? "Accès activé !" : "Access activated!"}
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              {isFr
                ? "Vos chapitres audio sont disponibles ci-dessous. Un email de confirmation a été envoyé."
                : "Your audio chapters are available below. A confirmation email has been sent."}
            </p>
            <button
              onClick={onClose}
              className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors"
            >
              {isFr ? "Écouter maintenant" : "Listen now"}
            </button>
          </div>
        )}

        {/* Error */}
        {step === "error" && (
          <div className="text-center py-4">
            <div className="text-4xl mb-3">❌</div>
            <p className="text-red-400 mb-2">
              {isFr ? "Une erreur s'est produite." : "An error occurred."}
            </p>
            <p className="text-gray-500 text-xs mb-4">{errorMsg}</p>
            <button
              onClick={() => { setStep("payment"); setErrorMsg(""); }}
              className="text-yellow-400 underline text-sm mr-4"
            >
              {isFr ? "Réessayer" : "Try again"}
            </button>
            <a href="mailto:brianconfantomes@gmail.com" className="text-gray-400 text-xs">
              brianconfantomes@gmail.com
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseModal;
