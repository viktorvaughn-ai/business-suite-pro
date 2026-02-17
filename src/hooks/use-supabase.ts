import { useEffect, useState } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

export function useSupabaseAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session ?? null);
      setUser(session?.user ?? null);
    });

    return () => {
      mounted = false;
      if (listener?.subscription) listener.subscription.unsubscribe();
    };
  }, []);

  const signIn = (email: string) => supabase.auth.signInWithOtp({ email });
  const signOut = () => supabase.auth.signOut();

  return { session, user, signIn, signOut } as const;
}

export default useSupabaseAuth;
