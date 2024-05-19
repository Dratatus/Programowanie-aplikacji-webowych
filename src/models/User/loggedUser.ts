import { UserRole } from "./user";

export interface LoggedUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    avatar: string;
}