"use client";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function EditCompany({ params }: { params: { cid: string } }) {
  const company = mockCompany;

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [picture, setPicture] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setName(company.name);
      setBusiness(company.business);
      setPicture(company.picture);
      setAddress(company.address);
      setProvince(company.province);
      setCode(company.postalcode);
      setPhone(company.tel);
      setLoading(false);
    }, 1000);
  }, []);

  const editCompany = () => {
    if (name && business && picture && address && province && code) {
      console.log(
        "create company",
        name,
        business,
        picture,
        address,
        province,
        code
      );
    }
  };

  return (
    <form onSubmit={editCompany} className="place-content-center h-full">
      <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit lg:w-[1200px] w-[600px] min-w-fit mx-auto space-y-5 lg:space-y-16">
        <h1 className="font-extrabold text-5xl text-center">Edit Company</h1>
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="grid lg:grid-cols-2 grid-flow-row gap-3">
            <TextInput
              label="Name"
              type="text"
              required={true}
              onChange={setName}
              value={name}
            />
            <TextInput
              label="Business"
              type="text"
              required={true}
              onChange={setBusiness}
              value={business}
            />
            <TextInput
              label="Picture"
              type="text"
              required={true}
              onChange={setPicture}
              value={picture}
            />
            <TextInput
              label="Address"
              type="text"
              required={true}
              onChange={setAddress}
              value={address}
            />
            <TextInput
              label="Province"
              type="text"
              required={true}
              onChange={setProvince}
              value={province}
            />
            <TextInput
              label="Postal Code"
              type="text"
              required={true}
              onChange={setCode}
              value={code}
            />
            <TextInput
              label="Telephone"
              type="tel"
              required={true}
              onChange={setPhone}
              value={phone}
            />
          </div>
        )}
        <div className="grid-flow-col space-y-3 lg:space-y-0 lg:grid lg:grid-cols-2 lg:items-center lg:gap-3 lg:place-self-end lg:place-items-end lg:w-[50%]">
          <Link href={`/companies/${company.id}`} className="w-full">
            <Button btnType="cancel" text="Cancel" />
          </Link>
          <Button btnType="submit" text="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
}
