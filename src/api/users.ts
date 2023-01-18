import { BASE_URL } from "./posts";
import axios, { AxiosResponse } from "axios";

interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export async function getUser(id: number) {
  const res = await axios.get<any, AxiosResponse<IUser>>(
    `${BASE_URL}/users/${id}`
  );
  return res.data;
}
