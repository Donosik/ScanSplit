import { ReactNode, useState } from 'react';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true)

  async function login(login: string, password: string):Promise<void> {
    setIsAuthenticated(true)
    // TODO:
    // add request to backend to login
  }

  async function logout(): Promise<void> {
    setIsAuthenticated(false)
    // TODO:
    // add request to backend to logout
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
