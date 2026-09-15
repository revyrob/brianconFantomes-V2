import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "../../Language";
import { getCookie, setCookie } from "../../lib/cookies";
import { loadGoogleAnalytics } from "../../lib/analytics";

const CONSENT_COOKIE = "bf_cookie_consent";
const CONSENT_DAYS = 365;

function CookieBanner() {
  const { dictionary } = useContext(LanguageContext);
  const t = dictionary.cookieBanner;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(CONSENT_COOKIE);
    if (consent === "accepted") {
      loadGoogleAnalytics();
    } else if (!consent) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    setCookie(CONSENT_COOKIE, "accepted", CONSENT_DAYS);
    loadGoogleAnalytics();
    setVisible(false);
  }

  function handleDecline() {
    setCookie(CONSENT_COOKIE, "rejected", CONSENT_DAYS);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 bg-gray-800 border-t border-gray-700 px-6 py-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-4">
        <p className="text-gray-300 text-sm flex-1">{t.text}</p>
        <div className="flex gap-3 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="text-gray-400 hover:text-white text-sm border border-gray-600 hover:border-gray-400 rounded-full px-5 py-2 transition-colors"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="bg-yellow-400 text-gray-900 font-bold text-sm rounded-full px-5 py-2 hover:bg-yellow-300 transition-colors"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CookieBanner;
