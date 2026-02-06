//import Image from "next/image";
//import css from "./ProfilePage.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import ProfilePageClient from "./ProfilePage";

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
  /*const session = cookieStore.get("session");

  if (!session) {
    redirect("/login");
  }*/

  return <ProfilePageClient />;
};

export default Profile;
