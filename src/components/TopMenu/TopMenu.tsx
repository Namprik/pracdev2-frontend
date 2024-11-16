import Link from "next/link";
import { Icon } from "@iconify/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

export type UserPage = "Companies" | "My Bookings";

export default function TopMenu({
  focus,
  name,
}: {
  focus: UserPage;
  name: string;
}) {
  const navigationLinks = [
    { name: "Companies", href: "/companies" },
    { name: "My Bookings", href: "/myBookings" },
  ];

  return (
    <div className="bg-dp-navbar flex flex-row justify-between text-white p-7 items-center text-nowrap truncate space-x-10 w-full">
      <div className="flex flex-row space-x-20 items-center ">
        <h1 className="font-extrabold text-[40px]">JOB FAIR</h1>
        {navigationLinks.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={`text-xl hover:font-bold focus:font-bold ${
              focus == link.name ? "font-bold" : "font-normal"
            } `}
          >
            {link.name}
          </Link>
        ))}
      </div>
      <div className="flex flex-row space-x-5 items-center">
        <label className="font-semibold text-xl text-nowrap truncate">
          Hello, <label className="font-normal">{name}</label>
        </label>
        <Link href="/signIn">
          <Icon icon="mdi:logout" className="text-white size-7" />
        </Link>
      </div>
    </div>
  );
}
