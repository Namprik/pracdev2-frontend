import TopMenu from "@/components/TopMenu/TopMenu";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const name = "Naphat Wareesawetsuwan";
  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit flex flex-col">
      <TopMenu focus="Companies" username={name} />
      <div className="grow p-7">{children}</div>
    </div>
  );
}
