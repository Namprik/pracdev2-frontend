"use client";

import Button from "@/components/Button/Button";
import DateBook from "@/components/Input/DateBook";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { getBooking, updateBooking } from "@/api/bookings";
import { getCompany } from "@/api/companies";
import dateToString from "@/libs/dateToString";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function Company({ params }: { params: { bid: string } }) {
  const { data: session } = useSession();
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const router = useRouter();
  const [bookDate, setBookDate] = useState<Dayjs | null>(dayjs());
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!session || !params.bid) return;

    const fetchData = async () => {
      try {
        // get booking by bookingId
        const bookingResponse = await getBooking(
          session.user.token,
          params.bid
        );
        if (bookingResponse.success) {
          const date = dayjs(bookingResponse.data.bookingDate);
          setBookDate(date);

          // get company by companyId
          const companyResponse = await getCompany(
            bookingResponse.data.company.id
          );
          if (companyResponse.success) {
            setCompany(companyResponse.data);
          } else {
            console.error(
              "Error fetching company details:",
              companyResponse.message
            );
          }
        } else {
          console.error(
            "Error fetching booking details:",
            bookingResponse.message
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [session, params.bid]);

  // edit booking
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (session && company && bookDate) {
      try {
        const response = await updateBooking(
          session.user.token,
          params.bid,
          bookDate.format("YYYY-MM-DD")
        );
        if (!response.success) {
          alert("Failed to create booking");
          return;
        }
        router.push("/myBookings");
      } catch (error) {
        console.error("Error to edit booking", error);
      }
    }
  };

  return (
    <>
      {loading || !company ? (
        <div className="text-center">Loading...</div>
      ) : (
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
          <form onSubmit={onSubmit}>
            <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit min-w-fit w-full mx-auto space-y-7">
              <h1 className="font-extrabold text-5xl text-center">
                Edit Booking
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
                onClick={() => router.back()}
              />

              <Button btnType="submit" text="Confirm" type="submit" />
            </div>
          </form>
        </div>
      )}
    </>
  );
}
