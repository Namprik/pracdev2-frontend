import { resolve } from "path";

export default async function getCompanies() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch("http://localhost:5000/api/v1/companies");
  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }
  return await response.json();
}
