export interface Appointment {
    id: string;
    clientName: string;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'cancelled';
  }