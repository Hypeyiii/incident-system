export type ProductsProps = {
  id: number;
  date?: Date;
};

export type TIncident = {
  id: number;
  title: string;
  description: string;
  status?: string;
  priority?: string;
  created_at?: string;
  updated_at?: Date;
  resolved_at?: string;
  reported_by: string;
  assigned_to?: string;
  category?: string;
  department: string;
  resolution?: string;
  severity?: "low" | "medium" | "high" | "critical";
  reported_by_name?: string;
  assigned_to_name?: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  role_name: string;
  department_name: string;
};

// lib/types.ts

export interface TUserToken {
  id: string;
  name: string;
  email: string;
}
