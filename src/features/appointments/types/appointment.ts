export interface Appointment {
  id: number;
  client: string;
  date: string;
  time: string;
  user: {
    name: number;
    email: string;
  };
  barberName: string;
  service: string;
  userId: number;
  status: "pending" | "confirmed" | "cancelled";
}
