import Image from "next/image";
import css from "./ProfilePage.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getMe } from "@/lib/api/serverApi";

export const metadata: Metadata = {
  title: "Profile Page | MyApp",
  description: "View and edit your user profile",

  openGraph: {
    title: "Profile Page | MyApp",
    description: "View and edit your user profile",
    url: "https://your-domain.com/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "Profile Page | MyApp",
      },
    ],
  },
};

const Profile = async () => {
  const cookieStore = await cookies();
  if (!cookieStore.get("accessToken")) {
    redirect("/sign-in");
  }

  const user = await getMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username}e</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
