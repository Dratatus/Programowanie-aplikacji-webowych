import { User } from '../models/User/user';
import axios from 'axios';

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private apiURL = 'http://localhost:3000/api/auth';
  private users: User[] = [
    {
      id: 1,
      firstName: 'Tytus',
      lastName: 'Bomba',
      role: 'Admin',
      passwords: { password: 'password123', email: 'tytus@example.com', }
    },
    {
      id: 2,
      firstName: 'Romek',
      lastName: 'Atomek',
      role: 'Developer',
      passwords: { password: 'password123', email: 'romek@example.com' }
    },
    {
      id: 3,
      firstName: 'Alojzy',
      lastName: 'Mortadela',
      role: 'DevOps',
      passwords: { password: 'password123', email: 'alojzy@example.com', }
    }
  ];

  private constructor() { }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(email: string, password: string): Promise<{ token: string, refreshToken: string }> {
    try {
      const response = await axios.post(`${this.apiURL}/login`, { email, password });
      const { token, refreshToken } = response.data;
      this.currentUser = this.decodeToken(token);
      return { token, refreshToken };
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }

  public async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${this.apiURL}/refresh-token`, { refreshToken });
      const { token } = response.data;
      return { token };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  private decodeToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        id: payload.id,
        firstName: payload.firstName,
        lastName: payload.lastName,
        role: payload.role,
        passwords: { email: payload.email, password: '' }
      };
    } catch (error) {
      return null;
    }
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
  public getUsers(): User[]  {
    return this.users;
  }
}

export default AuthService.getInstance();