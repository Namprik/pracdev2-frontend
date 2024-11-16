"use client";

import Button from "@/components/Button/Button";
import DateBook from "@/components/Input/DateBook";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(timezone);

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

const mockBooking: BookingItem = {
  id: "1",
  bookingDate: "2024-08-12",
  user: "user123",
  company: "64f5a1e1e6b79c001234abcd",
  createdAt: new Date().toISOString(),
};

export default function Company({ params }: { params: { cid: string } }) {
  const router = useRouter();

  const company = mockCompany;
  const [bookDate, setBookDate] = useState<Dayjs | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const date = dayjs(mockBooking.bookingDate);
    setTimeout(() => {
      setBookDate(date);
      setLoading(false);
    }, 1000);
  }, []);

  const makeBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookDate) {
      console.log("Booking confirmed for:", bookDate.format("YYYY-MM-DD"));
    } else {
      console.log("Please enter a date.");
    }
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
          <h1 className="font-extrabold text-5xl text-center">Edit Booking</h1>
          <div className="pb-7 space-y-2">
            <label>Booking Date:*</label>
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : (
              <DateBook
                date={bookDate}
                onDateChange={(value: Dayjs | null) => setBookDate(value)}
              />
            )}
          </div>
          <Button
            btnType="cancel"
            text="Cancel"
            onClick={() => router.back()}
          />

          <Button btnType="submit" text="Confirm" type="submit" />
        </div>
      </form>
    </div>
  );
}
