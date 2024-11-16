"use client";
import TopMenu from "@/components/TopMenu/TopMenu";
import { useSession } from "next-auth/react";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit flex flex-col">
      <TopMenu focus="Companies" name={session?.user.name || ""} />
      <div className="grow p-7">{children}</div>
    </div>
  );
}
