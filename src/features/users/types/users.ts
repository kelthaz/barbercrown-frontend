export interface Users {
  id: string;
  name: string;
  email: string;
  profile: string;
  password: string;
  phone: string;
  rol: {id: number; name: string};
  rol_id: number
  estado: number
}
