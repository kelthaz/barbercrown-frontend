import { Appointment } from "../types/appointment";
import { Users } from "../../users/types/users";
import api from "../../../shared/app/apiConfig";

const BASE_URL = `${import.meta.env.VITE_APP_API_URL}appointments`;

export const fetchAppointments = async (): Promise<Appointment[]> => {
  const response = await api.get(`${BASE_URL}`);
  return response.data;
};

export const createAppointment = async (
  appointmentData: Partial<Appointment>
): Promise<Appointment> => {
  const response = await api.post(BASE_URL, appointmentData);
  return response.data;
};

export const getTime = async (
  appointmentData: Partial<Appointment>
): Promise<string[]> => {
  const { barberName, date } = appointmentData;
  const response = await api.post(
    `/appointments/available/${barberName}/${date}`
  );
  return response.data;
};

export const fetchBarbers = async (): Promise<Users[]> => {
  const response = await api.get(
    `${import.meta.env.VITE_APP_API_URL}users/barbers`
  );
  return response.data;
};
