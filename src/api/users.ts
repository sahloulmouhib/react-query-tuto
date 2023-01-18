import { BASE_URL } from "./posts";
import axios from "axios";

export async function getUser(id: number) {
  const res = await axios.get(`${BASE_URL}/users/${id}`);
  return res.data;
}
