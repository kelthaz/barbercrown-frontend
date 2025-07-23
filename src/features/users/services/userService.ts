import axios from "axios";
import { Users } from "../types/users";

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}users`;

export const fetchUsers = async (): Promise<Users[]> => {
  const response = await axios.get(`${BASE_URL}`);
  return response.data;
};

export const createUser = async (userData: Partial<Users>): Promise<Users> => {
  const response = await axios.post(BASE_URL, userData);
  return response.data;
};
