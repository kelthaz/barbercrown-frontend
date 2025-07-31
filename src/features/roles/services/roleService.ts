import axios from "axios";
import { Roles } from "../types/roles";

export const fetchRoles = async (): Promise<Roles[]> => {
  const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}roles`);
  return response.data;
};