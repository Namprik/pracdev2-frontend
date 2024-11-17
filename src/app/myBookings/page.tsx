"use client";

import BookingCard from "@/components/Card/BookingCard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getBookings } from "@/api/bookings";
import { deleteBooking } from "@/api/bookings";

export default function myBookings() {
  const router = useRouter();
  const { data: session } = useSession();
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    if (!session) return;

    try {
      const data = await getBookings(session.user.token);
      setBookings(data.data);
    } catch (error) {
      console.error("Error fetching bookings data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // delete booking by id
  const onDelete = async (bookingId: string) => {
    if (session) {
      try {
        const response = await deleteBooking(session.user.token, bookingId);

        if (!response.success) {
          alert(`Error deleting booking with id: ${bookingId}`);
          return;
        }

        fetchData();
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  return (
    <>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="pt-12 grid-flow-col space-y-7 h-full">
          {bookings.length === 0 && (
            <div className="m-auto text-2xl font-semibold text-center">
              No Interview Booking
            </div>
          )}
          {bookings.map((bookItem: BookingItem) => (
            <BookingCard
              key={bookItem._id}
              bookingItem={bookItem}
              onEdit={() => router.push(`/myBookings/${bookItem._id}`)}
              onDelete={() => {
                onDelete(bookItem._id);
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
