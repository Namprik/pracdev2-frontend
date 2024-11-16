import TopMenu from "@/components/TopMenu/TopMenu";

export default function myBookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit flex flex-col">
      <TopMenu />
      <div className="grow p-7">{children}</div>
    </div>
  );
}
