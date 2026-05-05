import { useState, useEffect, useCallback } from "react";
import { supabase } from "../lib/supabase";

export function useAuth() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async (userId) => {
    const { data } = await supabase
      .from("user_profile")
      .select("paid, product, end_date")
      .eq("id", userId)
      .single();
    setProfile(data || null);
  }, []);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => {
          if (mounted) setLoading(false);
        });
      } else {
        setLoading(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (!mounted) return;
      setSession(session);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const refreshProfile = useCallback(() => {
    if (session?.user) fetchProfile(session.user.id);
  }, [session, fetchProfile]);

  const isPaid = !!(
    profile?.paid && new Date(profile.end_date) > new Date()
  );
  const isExpired = !!(
    profile?.paid && new Date(profile.end_date) <= new Date()
  );

  return { session, profile, loading, isPaid, isExpired, refreshProfile };
}
