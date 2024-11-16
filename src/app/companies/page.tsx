"use client";

import Button from "@/components/Button/Button";
import CompanyCard from "@/components/Card/CompanyCard";
import TopMenu from "@/components/TopMenu/TopMenu";
import { Icon } from "@iconify/react";
import Link from "next/link";
import { useState } from "react";

const mockCompanies: CompaniesJson = {
  success: true,
  count: 3,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    pageSize: 3,
  },
  data: [
    {
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
    },
    {
      _id: "64f5a1e1e6b79c001234abce",
      name: "Green Energy Co.",
      business: "Renewable Energy",
      address: "456 Solar Street",
      district: "Austin",
      province: "Texas",
      postalcode: "73301",
      tel: "+1-512-555-0202",
      picture:
        "https://drive.google.com/thumbnail?id=1HQErqHy0irI9hefoFqzAerRCGqK4mraA&sz=w1000",
      __v: 0,
      id: "64f5a1e1e6b79c001234abce",
    },
    {
      _id: "64f5a1e1e6b79c001234abcf",
      name: "HealthCare Plus",
      business: "Healthcare Services",
      address: "789 Wellness Avenue",
      district: "Orlando",
      province: "Florida",
      postalcode: "32801",
      tel: "+1-407-555-0303",
      picture:
        "https://drive.google.com/thumbnail?id=1HQErqHy0irI9hefoFqzAerRCGqK4mraA&sz=w1000",
      __v: 0,
      id: "64f5a1e1e6b79c001234abcf",
    },
  ],
};

export default function Companies() {
  const [search, setSearch] = useState("");
  const companies = mockCompanies;

  const filteredCompanies = companies.data.filter(
    (company) =>
      company.name.toLowerCase().includes(search.toLowerCase()) ||
      company.business.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white w-screen h-screen min-w-fit min-h-fit overflow-x-scroll">
      <TopMenu />
      <div className="p-7 space-y-2">
        {/* Search function */}
        <div className="flex flex-row justify-between items-center">
          <div className="relative w-[500px]">
            <input
              className="rounded-3xl border border-dp-border focus:border-dp-blue focus:outline-none placeholder:text-dp-border text-black pl-5 pr-10 py-3 w-full"
              placeholder="Find Company"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="absolute inset-y-0 end-0 flex items-center pe-5">
              <Icon icon="line-md:search" className="text-dp-border size-4" />
            </button>
          </div>

          {/* for admin to create space */}
          <Link href="/companies/createCompany" className="w-[200px]">
            <Button btnType="submit" text="Create Company" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-8 pt-4 xl:grid xl:grid-cols-2">
          {filteredCompanies.length > 0 ? (
            filteredCompanies.map((companyItem: CompanyItem) => (
              <div key={companyItem.id}>
                <CompanyCard
                  id={companyItem.id}
                  name={companyItem.name}
                  business={companyItem.business}
                  imgSrc={companyItem.picture}
                />
              </div>
            ))
          ) : (
            <p>No companies found matching "{search}"</p>
          )}
        </div>
      </div>
    </div>
  );
}
