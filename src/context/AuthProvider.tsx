import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Session, User } from '@supabase/supabase-js';

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  roles: string[];
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshRoles: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session ?? null);
      setUser(data.session?.user ?? null);
      setLoading(false);
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

  useEffect(() => {
    // derive roles from user metadata or fetch profile table if present
    const loadRoles = async () => {
      if (!user) {
        setRoles([]);
        return;
      }

      // Try user metadata first
      const md = (user as any).user_metadata as any;
      if (md?.roles) {
        setRoles(Array.isArray(md.roles) ? md.roles : [String(md.roles)]);
        return;
      }
      if (md?.role) {
        setRoles([String(md.role)]);
        return;
      }

      // Fallback: try to read `profiles` table's `role` column (if it exists)
      try {
        const { data, error } = await supabase.from('profiles').select('role').eq('id', user.id).single();
        if (!error && data?.role) {
          setRoles([String(data.role)]);
          return;
        }
      } catch (e) {
        // ignore
      }

      setRoles([]);
    };

    void loadRoles();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) throw new Error(error.message);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setRoles([]);
  };

  const refreshRoles = async () => {
    if (!user) return;
    // re-run the effect logic: try metadata then profiles table
    const md = (user as any).user_metadata as any;
    if (md?.roles) return setRoles(Array.isArray(md.roles) ? md.roles : [String(md.roles)]);
    if (md?.role) return setRoles([String(md.role)]);
    try {
      const { data, error } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (!error && data?.role) {
        setRoles([String(data.role)]);
        return;
      }
    } catch (e) {}
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ session, user, roles, loading, signIn, signUp, signOut, refreshRoles }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
