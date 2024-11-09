import { ReactNode } from 'react';
import { AuthProvider } from '../AuthProvider/AuthProvider';

interface ProviderProps {
  children: ReactNode;
}

export function Providers({ children }: ProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
