import axios from 'axios';
import { loggedUser } from '../../reactive/refs';
import { LoggedUser } from '../../models/User/loggedUser';
import { jwtDecode } from 'jwt-decode';


class GoogleAuthService {
  private static instance: GoogleAuthService;
  private apiURL = import.meta.env.VITE_API_URL;

  private constructor() { }

  public static getInstance(): GoogleAuthService {
    if (!GoogleAuthService.instance) {
      GoogleAuthService.instance = new GoogleAuthService();
    }
    return GoogleAuthService.instance;
  }

  public loginWithGoogle() {
    window.location.href = `${this.apiURL}/google`;
  }

  public async handleGoogleCallback(): Promise<void> {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const refreshToken = params.get('refreshToken');
    const googleToken = params.get('googleToken');
  
    if (token && refreshToken && googleToken) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('googleToken', googleToken);
      loggedUser.value = this.decodeToken(token);
      console.log(loggedUser.value)
    } else {
      throw new Error('Google authentication failed');
    }
  }

  private decodeToken(token: string): LoggedUser | null {
    try {
      const decoded: any = jwtDecode(token);
      console.log(decoded.name)
      return {
        id: decoded.id,
        name: decoded.firstName || '',
        email: decoded.email,
        role: decoded.role,
        avatar: decoded.avatar || ''
      };
    } catch (error) {
      return null;
    }
  }
}

export default GoogleAuthService;