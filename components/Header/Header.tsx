"use client";

import css from "./Header.module.css";
import Link from "next/link";

import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { useAuthStore } from "@/lib/store/authStore";

function Header() {
  const { isAuthenticated, user } = useAuthStore();

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
          <AuthNavigation isAuthenticated={isAuthenticated} user={user} />
        </ul>
      </nav>
    </header>
  );
}

export default Header;
