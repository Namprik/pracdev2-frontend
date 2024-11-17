import TopMenu from "@/components/TopMenu/TopMenu";

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit flex flex-col">
      <TopMenu focus="Companies" />
      <div className="grow p-7">{children}</div>
    </div>
  );
}
