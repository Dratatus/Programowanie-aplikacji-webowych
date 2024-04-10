import { User } from '../models/user';

class AuthService {
  private static instance: AuthService;
  private currentUser: User | null = null;
  private users: User[] = [
    { id: 1, firstName: 'Tytus', lastName: 'Bomba', role: 'Admin' },
    { id: 2, firstName: 'Romek', lastName: 'Atomek', role: 'Developer' },
    { id: 3, firstName: 'Alojzy', lastName: 'Mortadela', role: 'DevOps' }
  ];

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public loginUser(id: number = 1): User {
    const user = this.users.find(user => user.id === id);
    if (user) {
      this.currentUser = user;
      return user;
    }
    throw new Error("User not found");
  }

  public getCurrentUser(): User | null {
    return this.currentUser;
  }

  public getUsers(): User[] {
    return this.users;
  }
}

export default AuthService.getInstance();
