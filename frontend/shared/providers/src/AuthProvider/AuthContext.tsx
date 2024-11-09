import { createContext } from 'react';

export interface AuthContextProps {
  isAuthenticated: boolean;
  login: (login: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false, login(login: string, password: string): Promise<void> {
    return Promise.resolve(undefined);
  }, logout(): Promise<void> {
    return Promise.resolve(undefined);
  }
});
