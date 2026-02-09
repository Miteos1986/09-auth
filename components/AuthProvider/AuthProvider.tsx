"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/lib/store/authStore";

import { checkSession, getMe } from "@/lib/api/clientApi";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const privateRoutes = ["/profile", "/notes"];

function AuthProvider({ children }: Props) {
  const pathname = usePathname();

  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [loading, setLoading] = useState(true);

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route),
  );

  useEffect(() => {
    if (!isPrivateRoute) {
      setLoading(false);
      return;
    }

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
  }, [setUser, clearIsAuthenticated, isPrivateRoute]);

  if (isPrivateRoute && loading) {
    return <div>Loading...</div>;
  }

  if (isPrivateRoute && !isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

export default AuthProvider;
