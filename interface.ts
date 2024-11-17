interface CompanyItem {
  _id: string;
  name: string;
  business: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  __v: number;
  id: string;
}

interface CompaniesJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CompanyItem[];
}

interface BookingItem {
  _id: string;
  id: string;
  user: string;
  company: CompanyBook;
  bookingDate: string;
  createdAt: string;
  __v: number;
}

interface CompanyBook {
  _id: string;
  name: string;
  address: string;
  tel: string;
  id: string;
}

interface User {
  name: string;
  email: string;
  tel: string;
  role: string;
  password: string;
  createdAt: string;
}
