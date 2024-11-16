"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Link from "next/link";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";

const mockCompany: CompanyItem = {
  _id: "64f5a1e1e6b79c001234abcd",
  name: "Tech Solutions Inc.",
  business: "IT Services",
  address: "123 Silicon Valley",
  district: "Palo Alto",
  province: "California",
  postalcode: "94301",
  tel: "+1-650-555-0101",
  picture:
    "https://drive.google.com/thumbnail?id=1HQErqHy0irI9hefoFqzAerRCGqK4mraA&sz=w1000",
  __v: 0,
  id: "64f5a1e1e6b79c001234abcd",
};

export default function Company({ params }: { params: { cid: string } }) {
  const company = mockCompany;
  const router = useRouter();
  return (
    <div className="space-y-5 h-full">
      <Image src={company.picture} alt="image" width={758} height={376} />

      {/* company info */}
      <div className="bg-dp-gray-light px-6 py-8 space-y-5 rounded-2xl w-full">
        <h1 className="font-black text-4xl">{company.name}</h1>
        <div className="flex flex-row space-x-2.5 items-center">
          <Icon icon="ion:business-outline" className="size-6" />
          <label className="font-medium">Business: </label>
          <label className="font-light">{company.business}</label>
        </div>
        <div className="flex flex-row space-x-2.5 items-center">
          <Icon icon="mdi:address-marker" className="size-6" />
          <label className="font-medium">Address: </label>
          <label className="font-light">{company.address}</label>
        </div>
        <div className="flex flex-row space-x-2.5 items-center">
          <Icon icon="mingcute:phone-fill" className="size-6" />
          <label className="font-medium">Tel: </label>
          <label className="font-light">{company.tel}</label>
        </div>

        {/* btn for go back or booking */}
        <div className="grid grid-cols-2 gap-4 w-[50%] place-self-end">
          {/* <Button btnType="cancel" text="Back" onClick={() => router.back()}/> */}
          <Button
            btnType="cancel"
            text="Edit"
            onClick={() => router.push(`/companies/${params.cid}/editCompany`)}
          />
          <Button
            btnType="submit"
            text="Booking"
            onClick={() => router.push(`/companies/${params.cid}/booking`)}
          />
        </div>
      </div>
      <div className="flex w-[25%] min-w-fit">
        <Button btnType="cancel" text="Back" onClick={() => router.back()} />
      </div>
    </div>
  );
}
