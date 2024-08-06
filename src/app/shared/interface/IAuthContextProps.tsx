export interface IAuthContextProps {
  nameUser: string;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<string | void>;
  logout: () => void;
  error: string | null;
}
