import { resolve } from "path";

export interface createCompany {
  name: string;
  address: string;
  business: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
}

// get all companies
export async function getCompanies() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(
    "https://final-project-vi-backend.vercel.app/api/v1/companies",
    {
      method: "GET",
      headers: {
        Accept: "*/*",
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  return await response.json();
}

// get company by id
export async function getCompany(cid: string) {
  const response = await fetch(
    `https://final-project-vi-backend.vercel.app/api/v1/companies/${cid}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch company ${cid}`);
  }
  return await response.json();
}

// create company
export async function createCompany(token: string, data: createCompany) {
  const response = await fetch(
    "https://final-project-vi-backend.vercel.app/api/v1/companies",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to create company");
  }
  return await response.json();
}

// update company
export async function updateCompany(
  token: string,
  cid: string,
  data: createCompany
) {
  const response = await fetch(
    `https://final-project-vi-backend.vercel.app/api/v1/companies/${cid}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify({
        ...data,
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update company");
  }
  return await response.json();
}

// delete company
export async function deleteCompany(token: string, cid: string) {
  const response = await fetch(
    `https://final-project-vi-backend.vercel.app/api/v1/companies/${cid}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete company");
  }

  return await response.json();
}
