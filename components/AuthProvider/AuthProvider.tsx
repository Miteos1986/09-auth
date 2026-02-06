"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/lib/store/authStore";

import { checkSession, getMe } from "@/lib/api/clientApi";

type Props = {
  children: React.ReactNode;
};

function AuthProvider({ children }: Props) {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const auth = await checkSession();

        if (auth) {
          const user = await getMe();
          if (user) setUser(user);
          else clearIsAuthenticated();
        } else {
          clearIsAuthenticated();
        }
      } catch {
        clearIsAuthenticated();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthProvider;
