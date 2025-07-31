import { Users } from "../types/users";
import api from "../../../shared/app/apiConfig";

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}users`;

export const fetchUsers = async (): Promise<Users[]> => {
  const response = await api.get(`${BASE_URL}`);
  return response.data;
};

export const createUser = async (userData: Partial<Users>): Promise<Users> => {
  const response = await api.post(BASE_URL, userData);
  return response.data;
};

export const udpateUser = async (id: number, data: any) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};
