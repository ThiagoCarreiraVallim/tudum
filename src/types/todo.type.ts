export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  labels?: string[]; 
  groups?: string[];
}