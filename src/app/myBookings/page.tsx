"use client";

import BookingCard from "@/components/Card/BookingCard";
import { useRouter } from "next/navigation";

const mockBooking: BookingItem[] = [
  {
    id: "1",
    bookingDate: "2023-08-20",
    user: "user123",
    company: "company456",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    bookingDate: "2023-08-20",
    user: "user123",
    company: "company456",
    createdAt: new Date().toISOString(),
  },
];

export default function myBookings() {
  const bookingItems = mockBooking;
  const router = useRouter();
  return (
    <div className="pt-12 grid-flow-col space-y-7 h-full">
      {bookingItems.length === 0 && (
        <div className="m-auto text-2xl font-semibold text-center">
          No Interview Booking
        </div>
      )}
      {bookingItems.map((bookItem) => (
        <BookingCard
          bookingItem={bookItem}
          onEdit={() => router.push(`/myBookings/${bookItem.id}`)}
          onDelete={() => console.log("delete")}
        />
      ))}
    </div>
  );
}
