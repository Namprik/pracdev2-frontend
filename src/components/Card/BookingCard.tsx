import Image from "next/image";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import { getCompany } from "@/api/companies";
import dateToString from "@/libs/dateToString";

export default function BookingCard({
  bookingItem,
  onEdit,
  onDelete,
}: {
  bookingItem: BookingItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompany(bookingItem.company.id);
        setCompany(data.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading || !company ? (
        <div className="shadow-dp-shadow bg-white grid grid-cols-[30%,1fr] px-5 py-4 gap-4 rounded-2xl border border-dp-border">
          <div className="text-center">Loading...</div>
        </div>
      ) : (
        <div className="shadow-dp-shadow bg-white grid grid-cols-[30%,1fr] px-5 py-4 gap-4 rounded-2xl border border-dp-border">
          <div className="relative w-full h-full rounded-lg overflow-hidden">
            <Image
              src={company.picture}
              alt="Company Image"
              fill={true}
              className="object-cover"
            />
          </div>
          <div className="flex flex-col space-y-2 grow">
            <h1 className="font-bold text-4xl text-dp-navbar">
              {company.name}
            </h1>
            <label className="text-xl text-dp-gray font-extralight">
              {company.business}
            </label>
            <label className="text-xl text-dp-gray font-extralight">
              Created at: {dateToString(bookingItem.createdAt)}
            </label>
            <label className="text-dp-navbar font-medium text-xl">
              Booking Date: {dateToString(bookingItem.bookingDate)}
            </label>
            <div className="grow flex flex-row space-x-2 place-self-end place-items-end w-[410px] min-w-fit">
              <Button btnType="cancel" text="Edit" onClick={onEdit} />
              <Button btnType="delete" text="Delete" onClick={onDelete} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

{
  /**
  
  */
}
