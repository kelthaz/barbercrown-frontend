import { Roles } from "../types/roles";
import api from "../../../shared/app/apiConfig";

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}roles`;

export const fetchRoles = async (): Promise<Roles[]> => {
  const response = await api.get(`${import.meta.env.VITE_APP_API_URL}roles`);
  return response.data;
};

export const createRole = async (roleData: Partial<Roles>): Promise<Roles> => {
  const response = await api.post(BASE_URL, roleData);
  return response.data;
};