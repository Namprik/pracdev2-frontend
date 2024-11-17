"use client";

import Button from "@/components/Button/Button";
import TextInput from "@/components/Input/TextInput";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { createCompany } from "@/api/companies";

export default function CreateCompany() {
  const router = useRouter();
  const { data: session } = useSession();

  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [picture, setPicture] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [code, setCode] = useState("");
  const [phone, setPhone] = useState("");

  // create company
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) return;

    const data: createCompany = {
      name: name,
      business: business,
      picture: picture,
      address: address,
      province: province,
      postalcode: code,
      tel: phone,
    };
    try {
      const response = await createCompany(session.user.token, data);
      if (!response.success) {
        console.log("Failed to create company");
      }

      router.push("/companies");
    } catch (error) {
      console.error("Error to create company: ", error);
    }
  };

  return (
    <>
      {session?.user.role === "admin" ? (
        <form onSubmit={onSubmit} className="place-content-center h-full">
          <div className="rounded-2xl border border-dp-border py-10 px-12 h-hit lg:w-[1000px] w-[600px] min-w-fit mx-auto space-y-5 lg:space-y-16">
            <h1 className="font-extrabold text-5xl text-center">
              Create Company
            </h1>
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
      ) : (
        router.push("/companies")
      )}
    </>
  );
}
