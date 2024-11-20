import { resolve } from "path";

// get all bookings
export async function getBookings(token: string) {
  const response = await fetch(
    "https://backend-for-devprac2.vercel.app/api/v1/bookings",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  return await response.json();
}

// get booking by id
export async function getBooking(token: string, bookingId: string) {
  const response = await fetch(
    `https://backend-for-devprac2.vercel.app/api/v1/bookings/${bookingId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to get booking id: ${bookingId}`);
  }
  return await response.json();
}

// create booking
export async function createBooking(
  token: string,
  cid: string,
  bookDate: string
) {
  const response = await fetch(
    `https://backend-for-devprac2.vercel.app/api/v1/companies/${cid}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        bookingDate: bookDate,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create booking");
  }
  return await response.json();
}

// update booking
export async function updateBooking(
  token: string,
  bookingId: string,
  bookDate: string
) {
  const response = await fetch(
    `https://backend-for-devprac2.vercel.app/api/v1/bookings/${bookingId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        bookingDate: bookDate,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update booking");
  }
  return await response.json();
}

// delete booking by id
export async function deleteBooking(token: string, bookingId: string) {
  const response = await fetch(
    `https://backend-for-devprac2.vercel.app/api/v1/bookings/${bookingId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to delete booking");
  }
  return await response.json();
}
