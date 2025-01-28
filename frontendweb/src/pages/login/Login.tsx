import { useAuth } from '@/utils/auth/useAuth';
import LoginForm from './loginForm/LoginForm';
import AuthHeader from '@/components/auth/AuthHeader';

export default function Login() {
  const { login, error, isLoading } = useAuth();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <LoginForm onSubmit={login} error={error} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}