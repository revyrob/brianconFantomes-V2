import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { LanguageContext } from "../../Language";
import { useAuth } from "../../hooks/useAuth";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import RouteMap from "../../components/Map/RouteMap";

function Dashboard() {
  const { dictionary, userLanguage } = useContext(LanguageContext);
  const { session, loading, isPaid, profile } = useAuth();
  const isFrench = userLanguage === "fr";
  const t = dictionary.dashboard;

  if (loading) {
    return (
      <div className="flex justify-center py-16 bg-gray-900 min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400" />
      </div>
    );
  }

  if (!session || !isPaid) {
    return <Navigate to="/" replace />;
  }

  const expiryLabel = profile?.end_date
    ? new Date(profile.end_date).toLocaleDateString(
        isFrench ? "fr-FR" : "en-GB",
        { day: "numeric", month: "long", year: "numeric" },
      )
    : "";

  return (
    <section className="bg-gray-900 px-6 py-12 min-h-[60vh]">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="text-gray-400 hover:text-white text-sm mb-6 inline-block"
        >
          {t.back}
        </Link>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-white font-oswald text-xl">{t.title}</h2>
          <span className="text-gray-500 text-xs">
            {isFrench ? `Accès jusqu'au ` : "Access until "}
            <span className="text-yellow-400">{expiryLabel}</span>
          </span>
        </div>

        <AudioPlayer product={profile.product} />
        <RouteMap />
      </div>
    </section>
  );
}

export default Dashboard;
