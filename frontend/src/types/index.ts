export type Role = "WORKER" | "MANAGER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone: string;
  role: Role;
  avatar?: string;
  bio?: string;
  socialLinks?: any;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  requirements?: string;
  salaryMin?: number;
  salaryMax?: number;
  workConditions?: string;
  location: string;
  isActive: boolean;
  enterprise?: {
    name: string;
    location: string;
  };
}

export interface Application {
  id: string;
  status: "APPLIED" | "APPROVED" | "REJECTED" | "REMOVED" | "DONE";
  appliedAt: string;
  job: Job;
}
