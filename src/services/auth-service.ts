import { User } from '../models/user';

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public loginUser(): User {
    const mockUser: User = { id: 1, firstName: 'Tytus', lastName: 'Bomba' };
    this.currentUser = mockUser;
    return mockUser;
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }
}

export default AuthService.getInstance();