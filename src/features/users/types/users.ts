export interface Users {
  id: string;
  name: string;
  email: string;
  profile: string;
  password: string;
  phone: string;
  rol: {
    id: string;
    name: string;
  };
  estado: number
}
