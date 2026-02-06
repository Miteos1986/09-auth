"use client";

import css from "./Header.module.css";
import Link from "next/link";

import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/api/clientApi";

function Header() {
  const router = useRouter();

  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
  };

  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/notes/filter/all">Notes</Link>
          </li>
          <AuthNavigation
            isAuthenticated={isAuthenticated}
            user={user}
            onLogout={handleLogout}
          />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
