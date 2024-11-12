import { AuthProvider } from '../AuthProvider/AuthProvider';
import { ProviderProps } from './ProviderProps';

export function Providers({ children }: ProviderProps) {
  return (
    <AuthProvider>{children}
    </AuthProvider>
  );
}
