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
  id: string;
  user: string;
  company: string;
  bookingDate: string;
  createdAt: string;
}

interface User {
  name: string;
  email: string;
  tel: string;
  role: string;
  password: string;
  createdAt: string;
}
