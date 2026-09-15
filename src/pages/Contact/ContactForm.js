import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../../Language";

const REASONS = ["Customer Question", "App Issue", "Other"];

// status: idle | sending | success | error
function ContactForm() {
  const { dictionary } = useContext(LanguageContext);
  const t = dictionary.contact;

  const [reason, setReason] = useState(REASONS[0]);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/.netlify/functions/send-contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, email, message }),
      });

      if (!res.ok) {
        let msg = `HTTP ${res.status}`;
        try {
          const body = await res.json();
          msg = body.error || msg;
        } catch {}
        throw new Error(msg);
      }

      setStatus("success");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message || dictionary.notSubmitted);
    }
  }

  return (
    <section className="bg-gray-900 px-6 py-16 min-h-[60vh]">
      <div className="max-w-md mx-auto">
        <Link
          to="/"
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block"
        >
          {t.back}
        </Link>

        <h1 className="text-white font-oswald text-2xl mb-6">{t.title}</h1>

        {status === "success" ? (
          <p className="text-yellow-400">{dictionary.submitted}</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">
                {t.reasonLabel}
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              >
                {REASONS.map((r) => (
                  <option key={r} value={r}>
                    {t.reasons[r]}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                {t.emailLabel}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="exemple@email.com"
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">
                {t.messageLabel}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                maxLength={2000}
                rows={5}
                placeholder={t.messagePlaceholder}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none"
              />
            </div>

            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-yellow-400 text-gray-900 font-bold py-3 rounded-full mt-2 hover:bg-yellow-300 transition-colors disabled:opacity-60"
            >
              {status === "sending" ? t.sending : t.send}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export default ContactForm;
