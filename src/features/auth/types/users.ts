export interface Users {
  id: string;
  userName: string;
  email: string;
  profile: string;
  password: string;
  status: "Activo" | "Inactivo";
}
