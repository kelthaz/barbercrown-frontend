// src/services/userService.ts
import axios from "axios";
import { Users } from "../types/users";

export const fetchUsers = async (): Promise<Users[]> => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}users`);
  console.log("Fetched users:", response.data);
  return response.data;
};