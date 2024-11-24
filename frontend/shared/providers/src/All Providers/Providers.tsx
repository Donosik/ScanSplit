import { AuthProvider } from '../AuthProvider/AuthProvider';
import { ProviderProps } from './ProviderProps';
import { ThemeProvider } from '../ThemeProvider/ThemeProvider';

export function Providers({ children }: ProviderProps) {
  return (
    <AuthProvider>
      <ThemeProvider>
      {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
