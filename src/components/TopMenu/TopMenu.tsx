"use client";

import { Icon } from "@iconify/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export type UserPage = "Companies" | "My Bookings";

export default function TopMenu({ focus }: { focus: UserPage }) {
  const router = useRouter();
  const { data: session } = useSession();

  const navigationLinks = [
    { name: "Companies", href: "/companies" },
    { name: "My Bookings", href: "/myBookings" },
  ];

  const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signOut({ redirect: false });
      router.push("/signIn");
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <div className="bg-dp-navbar flex flex-row justify-between text-white p-7 items-center text-nowrap truncate space-x-10 w-full">
      <div className="flex flex-row text-white no-underline space-x-20 items-center ">
        <h1 className="font-extrabold text-[40px]">JOB FAIR</h1>
        {navigationLinks.map((link, index) => (
          <button
            key={index}
            onClick={() => router.push(link.href)}
            className={`text-xl no-underline text-white hover:font-bold focus:font-bold ${
              focus == link.name ? "font-bold" : "font-normal"
            } `}
          >
            {link.name}
          </button>
        ))}
      </div>
      <div className="flex flex-row space-x-5 items-center">
        <label className="font-semibold text-xl text-nowrap truncate">
          Hello,{" "}
          {session && (
            <label className="font-normal">{session.user.name}</label>
          )}
        </label>
        <button onClick={handleSignOut}>
          <Icon icon="mdi:logout" className="text-white text-2xl" />
        </button>
      </div>
    </div>
  );
}
