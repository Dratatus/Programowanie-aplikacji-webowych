import { UserRole } from "../User/user";

export interface DecodedToken {
    id: string;
    email: string;
    role: UserRole;
    name: string;
    avatar: string;
  }
  