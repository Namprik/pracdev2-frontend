"use client";

import Button from "@/components/Button/Button";
import DateBook from "@/components/Input/DateBook";
import { Icon } from "@iconify/react";
import dayjs, { Dayjs } from "dayjs";
import Link from "next/link";
import { useState } from "react";
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

export default function Booking({ params }: { params: { cid: string } }) {
  const company = mockCompany;
  const router = useRouter();
  const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());

  const makeBooking = () => {
    if (bookDate) {
      console.log(params);
    }
    console.log("please enter date");
  };

  return (
    <div className="grid grid-cols-[60%,1fr] h-full gap-5">
      <div className="bg-dp-gray-light px-6 py-8 space-y-5 rounded-2xl w-full h-full">
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
      </div>
      <form onSubmit={makeBooking}>
        <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit min-w-fit w-full mx-auto space-y-7">
          <h1 className="font-extrabold text-5xl text-center">
            Create Booking
          </h1>
          <div className="pb-7 space-y-2">
            <label>Booking Date:*</label>
            <DateBook
              date={bookDate}
              onDateChange={(value: Dayjs | null) => setBookDate(value)}
            />
          </div>
          <Button
            btnType="cancel"
            text="Cancel"
            onClick={() => router.push(`/companies/${params.cid}`)}
          />

          <Button btnType="submit" text="Submit" type="submit" />
        </div>
      </form>
    </div>
  );
}
