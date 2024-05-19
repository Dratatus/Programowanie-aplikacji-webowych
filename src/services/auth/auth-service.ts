import { User } from '../../models/User/user';
import axios from 'axios';
import { LoggedUser } from '../../models/User/loggedUser';
import { loggedUser } from '../../reactive/refs';
import { jwtDecode } from 'jwt-decode';

class AuthService {
  private static instance: AuthService;
  private apiURL = import.meta.env.VITE_API_URL;

  private users: User[] = [
    {
      id: 1,
      firstName: 'Tytus',
      lastName: 'Bomba',
      role: 'Admin',
      passwords: { password: 'password123', email: 'tytus@example.com', },
      avatar: ''
    },
    {
      id: 2,
      firstName: 'Romek',
      lastName: 'Atomek',
      role: 'Developer',
      passwords: { password: 'password123', email: 'romek@example.com' },
      avatar: ''
    },
    {
      id: 3,
      firstName: 'Alojzy',
      lastName: 'Mortadela',
      role: 'DevOps',
      passwords: { password: 'password123', email: 'alojzy@example.com', },
      avatar: ''
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
      loggedUser.value = this.decodeToken(token);
      return { token, refreshToken };
    } catch (error) {
      throw new Error("Invalid email or password");
    }
  }

  public async refreshToken(refreshToken: string): Promise<{ token: string }> {
    try {
      const response = await axios.post(`${this.apiURL}/refresh-token`, { refreshToken });
      const { token } = response.data;
      loggedUser.value = this.decodeToken(token);
      return { token };
    } catch (error) {
      throw new Error("Invalid refresh token");
    }
  }

  private decodeToken(token: string): LoggedUser | null {
    try {
      const decoded: any = jwtDecode(token);
      return {
        id: decoded.id,
        name: decoded.name || '',
        email: decoded.email,
        role: decoded.role,
        avatar: decoded.avatar || ''
      };
    } catch (error) {
      return null;
    }
  }

  public getCurrentUser(): LoggedUser | null {
    return loggedUser.value;
  }
  public getUsers(): User[] {
    return this.users;
  }

}

export default AuthService.getInstance();
