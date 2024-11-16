import Image from "next/image";
import Button from "../Button/Button";
import Link from "next/link";

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

export default function BookingCard({
  bookingItem,
  onEdit,
  onDelete,
}: {
  bookingItem: BookingItem;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const company = mockCompany;
  return (
    <div className="shadow-dp-shadow bg-white flex flex-row px-5 py-4 gap-4 rounded-2xl border border-dp-border">
      <Image src={company.picture} alt="image" width={384} height={268} />
      <div className="flex flex-col space-y-2 grow">
        <h1 className="font-bold text-4xl text-dp-navbar">{company.name}</h1>
        <label className="text-xl text-dp-gray font-extralight">
          {company.business}
        </label>
        <label className="text-xl text-dp-gray font-extralight">
          Created at: {bookingItem.createdAt}
        </label>
        <label className="text-dp-navbar font-medium text-xl">
          Booking Date: {bookingItem.bookingDate}
        </label>
        <div className="grow flex flex-row space-x-2 place-self-end place-items-end w-[410px] min-w-fit">
          <Button btnType="cancel" text="Edit" onClick={onEdit} />
          <Button btnType="delete" text="Delete" onClick={onDelete} />
        </div>
      </div>
    </div>
  );
}
