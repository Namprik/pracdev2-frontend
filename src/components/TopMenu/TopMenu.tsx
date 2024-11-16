import Link from "next/link";
import { Icon } from "@iconify/react";

export default function TopMenu() {
  const name = "Naphat Wareesawetsuwan";

  return (
    <div className="bg-dp-navbar flex flex-row justify-between text-white p-7 items-center text-nowrap truncate space-x-10 w-full">
      <div className="flex flex-row space-x-20 items-center ">
        <h1 className="font-extrabold text-[40px]">JOB FAIR</h1>
        <Link
          href="/companies"
          className="text-xl hover:font-bold focus:font-bold"
        >
          Home
        </Link>
        <Link
          href="/myBookings"
          className="text-xl hover:font-bold focus:font-bold"
        >
          My Bookings
        </Link>
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
