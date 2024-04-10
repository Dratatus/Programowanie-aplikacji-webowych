export type UserRole = 'Admin' | 'Developer' | 'DevOps';


export interface User {
    id: number;
    firstName: string;
    lastName: string;
    role: UserRole;
  }