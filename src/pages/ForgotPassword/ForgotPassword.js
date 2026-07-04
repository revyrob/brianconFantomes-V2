import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        { redirectTo: `${window.location.origin}/reset-password` },
      );
      if (resetError) throw resetError;
      setSubmitted(true);
    } catch (err) {
      setError(
        err.message ??
          "A network error occurred. Please check your connection and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col">
        <main className="flex-1 flex items-center justify-center px-6 py-28">
          <div className="w-full max-w-sm text-center flex flex-col gap-4">
            <svg
              className="w-12 h-12 text-yellow-400 mx-auto"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
              />
            </svg>
            <h1 className="font-oswald text-2xl text-white">
              Check your inbox
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              If an account exists for{" "}
              <strong className="text-white">{email}</strong>, you'll receive a
              password reset link within a few minutes.
            </p>
            <p className="text-gray-500 text-xs">
              The link expires in 1 hour and can only be used once.
            </p>
            <Link
              to="/"
              className="text-yellow-400 text-sm hover:underline mt-2"
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <main className="flex-1 flex items-center justify-center px-6 py-28">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div>
            <h1 className="font-oswald text-3xl text-white mb-2">
              Forgot your password?
            </h1>
            <p className="text-gray-400 text-sm">
              Enter your email and we'll send you a reset link.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm text-gray-300">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-700 border border-gray-600 text-white text-sm px-4 py-3 rounded-lg outline-none focus:border-yellow-400 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading || !email}
              className="w-full bg-yellow-400 text-gray-900 font-bold text-sm py-3 rounded-full hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Sending…" : "Send Reset Link"}
            </button>

            <Link
              to="/"
              className="text-center text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              Back to Home
            </Link>
          </form>
        </div>
      </main>
    </div>
  );
}
