"use client";

import Button from "@/components/Button/Button";
import CompanyCard from "@/components/Card/CompanyCard";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import getCompanies from "@/libs/getCompanies";

export default function Companies() {
  const [companies, setCompanies] = useState<CompaniesJson | null>(null);
  const [filteredCompanies, setFilteredCompanies] = useState<CompanyItem[]>([]);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCompanies();
      setCompanies(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (companies?.data) {
      const filtered = companies.data.filter(
        (company: CompanyItem) =>
          company.name.toLowerCase().includes(search.toLowerCase()) ||
          company.business.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCompanies(filtered);
    }
  }, [search, companies]);

  return (
    <div className="space-y-2 h-full">
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
        <div className="w-[200px]">
          <Button
            btnType="submit"
            text="Create Company"
            onClick={() => router.push("/companies/createCompany")}
          />
        </div>
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
  );
}
