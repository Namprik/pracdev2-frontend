"use client";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getCompany from "@/libs/getCompany";

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
  const [company, setCompany] = useState<CompanyItem | null>(null);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [picture, setPicture] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCompany(params.cid);
        setCompany(data.data);
        setName(data.data.name);
        setBusiness(data.data.business);
        setPicture(data.data.picture);
        setAddress(data.data.address);
        setProvince(data.data.province);
        setCode(data.data.postalcode);
        setPhone(data.data.tel);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params.cid]);

  const editCompany = () => {
    if (name && business && picture && address && province && code) {
      console.log(
        "edit company",
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
      <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit lg:w-[1000px] w-[600px] min-w-fit mx-auto space-y-5 lg:space-y-16">
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
          <Button
            btnType="cancel"
            text="Cancel"
            onClick={() => router.back()}
          />

          <Button btnType="submit" text="Submit" type="submit" />
        </div>
      </div>
    </form>
  );
}
