"use client";

import Image from "next/image";
import { Icon } from "@iconify/react";
import Button from "@/components/Button/Button";
import { useRouter } from "next/navigation";
import getCompany from "@/libs/getCompany";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Company({ params }: { params: { cid: string } }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [company, setCompany] = useState<CompanyItem | null>(null);
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

  return (
    <>
      {loading || !company ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-5 h-full">
          <div className="relative w-[800px] h-[400px] rounded-lg overflow-hidden">
            <Image
              src={company.picture}
              alt="Company Image"
              fill={true}
              className="object-cover"
            />
          </div>

          {/* company info */}
          <div className="bg-dp-gray-light px-6 py-8 space-y-5 rounded-2xl w-full">
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

            {/* btn for go back or booking */}
            <div className="grid grid-cols-2 gap-4 w-[50%] place-self-end">
              {session?.user.role === "admin" ? (
                <Button
                  btnType="cancel"
                  text="Edit"
                  onClick={() =>
                    router.push(`/companies/${params.cid}/editCompany`)
                  }
                />
              ) : (
                <Button
                  btnType="cancel"
                  text="Back"
                  onClick={() => router.back()}
                />
              )}

              <Button
                btnType="submit"
                text="Booking"
                onClick={() => router.push(`/companies/${params.cid}/booking`)}
              />
            </div>
          </div>
          {session?.user.role === "admin" && (
            <div className="flex w-[25%] min-w-fit">
              <Button
                btnType="cancel"
                text="Back"
                onClick={() => router.back()}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}
