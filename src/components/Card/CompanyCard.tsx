import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";

export default function CompanyCard({
  id,
  name,
  business,
  imgSrc,
}: {
  id: string;
  name: string;
  business: string;
  imgSrc: string;
}) {
  return (
    <div className="grid grid-cols-[60%,1fr] shadow-dp-shadow border border-dp-border rounded-2xl p-5 bg-white h-[300px] w-full gap-4 min-w-fit">
      <div className="relative w-full h-full rounded-lg overflow-hidden">
        <Image
          src={imgSrc}
          alt="Company Image"
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <h1 className="font-black text-3xl">{name}</h1>
          <p className="font-extralight text-xl text-dp-gray">{business}</p>
        </div>
        <Link href={`/companies/${id}`}>
          <button className="flex flex-row items-center p-2 text-dp-blue-dark border border-dp-blue-dark hover:text-white hover:bg-dp-blue-dark rounded-lg space-x-4 w-fit h-fit">
            <label className="cursor-pointer">See more information</label>
            <Icon icon="ooui:next-ltr" className="size-5" />
          </button>
        </Link>
      </div>
    </div>
  );
}
