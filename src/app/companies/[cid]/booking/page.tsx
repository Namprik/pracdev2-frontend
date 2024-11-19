"use client";

import Button from "@/components/Button/Button";
import DateBook from "@/components/Input/DateBook";
import { Icon } from "@iconify/react";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCompany } from "@/api/companies";
import { useSession } from "next-auth/react";
import { getBookings, createBooking } from "@/api/bookings";

export default function Booking({ params }: { params: { cid: string } }) {
  const { data: session } = useSession();
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const router = useRouter();
  const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompany(params.cid);
        setCompany(data.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.cid]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!bookDate || !session || !params.cid) {
      alert("Missing required data.");
      return;
    }

    try {
      // get all booking to check count limit
      const response = await getBookings(session.user.token);
      if (!response.success) {
        alert("Failed to get all booking");
        return;
      }
      if (response.count >= 3) {
        alert("You have reached the maximum booking limit of 3.");
        router.push("/myBookings");
        return;
      }

      // Create booking
      const res = await createBooking(
        session.user.token,
        params.cid,
        bookDate.format("YYYY-MM-DD")
      );

      if (!res.success) {
        alert("Failed to create booking.");
        return;
      }
      router.push("/myBookings");
    } catch (error) {
      console.error("Error during booking process:", error);
    }
  };

  return (
    <div className="grid grid-cols-[60%,1fr] h-full gap-5">
      {loading || !company ? (
        <div className="text-center">Loading...</div>
      ) : (
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
      )}
      <form onSubmit={onSubmit}>
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
