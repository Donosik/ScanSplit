import { useContext } from 'react';
import { AuthContext, AuthContextProps } from './AuthContext';

export function useAuth() {
  const context: AuthContextProps = useContext(AuthContext);
  if (context === undefined) {
    console.log("Auth context doesn't exist");
  }
  return context;
}
