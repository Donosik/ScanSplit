import { register as registerUser, registerDTO } from '@/utils/services/authService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AvailableRoutes } from '@/utils/router/availableRoutes';
import RegisterForm from './registerForm/RegisterForm';
import AuthHeader from '@/components/auth/AuthHeader';

export default function Register() {
  const navigate = useNavigate();
  const { mutate, error, isPending } = useMutation({
    mutationFn: (data: registerDTO) => registerUser(data),
    onSuccess: () => {
      navigate(AvailableRoutes.LOGIN);
    },
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AuthHeader />
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <RegisterForm onSubmit={mutate} error={error?.message} isLoading={isPending} />
        </div>
      </main>
    </div>
  );
}