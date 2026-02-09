import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { User } from "@/types/user";

interface AuthNavigationProps {
  isAuthenticated: boolean;
  user: User | null;
  onLogout: () => void;
}

function AuthNavigation({
  isAuthenticated,
  user,
  onLogout,
}: AuthNavigationProps) {
  return (
    <>
      {isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
            >
              Profile
            </Link>
          </li>

          <li className={css.navigationItem}>
            <p className={css.userEmail}>{user?.email}</p>
            <button onClick={onLogout} className={css.logoutButton}>
              Logout
            </button>
          </li>
        </>
      )}

      {!isAuthenticated && (
        <>
          <li className={css.navigationItem}>
            <Link
              href="/sign-in"
              prefetch={false}
              className={css.navigationLink}
            >
              Login
            </Link>
          </li>

          <li className={css.navigationItem}>
            <Link
              href="/sign-up"
              prefetch={false}
              className={css.navigationLink}
            >
              Sign up
            </Link>
          </li>
        </>
      )}
    </>
  );
}

export default AuthNavigation;
