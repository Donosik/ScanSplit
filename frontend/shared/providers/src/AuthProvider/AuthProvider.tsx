import { useState } from 'react';
import { AuthContext } from './AuthContext';
import { ProviderProps } from '../All Providers/ProviderProps';

export function AuthProvider({ children }: ProviderProps) {
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
