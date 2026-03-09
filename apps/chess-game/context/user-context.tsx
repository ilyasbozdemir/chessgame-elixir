"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "@supabase/gotrue-js";
import { auth } from "@/lib/auth";

interface UserContextType {
  user: User | null;
  playerUser: any | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: Error | null }>;
  register: (email: string, password: string, username: string) => Promise<{ data: any; error: Error | null }>;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  playerUser: null,
  loading: true,
  login: async () => ({ error: null }),
  register: async () => ({ data: null, error: null }),
  logout: async () => { },
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const playerUser = user ? {
    _id: user.id,
    userId: user.id,
    username: user.user_metadata?.username || user.email?.split("@")[0],
    rating: {
      fideClassical: 1200,
      fideBlitz: 1500,
    }
  } : null;

  useEffect(() => {
    // Ilk session'i al
    const initSession = async () => {
      try {
        const { data: { session }, error } = await auth.getSession();
        if (session?.user) {
          setUser(session.user);
        }
      } catch (e) {
        console.error("Auth init error:", e);
      } finally {
        setLoading(false);
      }
    };
    initSession();

    // Session degisimlerini dinle (mesela baska sekmede giris yapilirsa)
    const { data: { subscription } } = auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { data, error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (data?.user) {
      setUser(data.user);
    }
    return { error };
  };

  const register = async (email: string, password: string, username: string) => {
    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username,
        },
      },
    });
    // GoTrue'da email onayi kapattigimiz icin direkt user verilir (CONFIRM kapali docker'da)
    if (data?.user) {
      setUser(data.user);
    }
    return { data, error };
  };

  const logout = async () => {
    await auth.signOut();
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{ user, playerUser, loading, login, register, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}
