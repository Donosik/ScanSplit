import { login as loginService, loginDTO } from '../services/authService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AvailableRoutes } from '../router/availableRoutes';

export function useAuth() {
  const navigate = useNavigate();

  function isAuthenticated(): boolean {
    return sessionStorage.getItem('token') !== null;
  }

  const onLogin = useMutation({
    mutationFn: (data: loginDTO) => {
      return loginService(data);
    },
    onSuccess: (token: string) => {
      sessionStorage.setItem('token', token);
      navigate(AvailableRoutes.HOME);
    },
  });

  function onLoginReset(data: loginDTO) {
    onLogin.reset();
    onLogin.mutate(data);
  }

  function logout() {
    sessionStorage.removeItem('token');
    navigate(AvailableRoutes.LANDING);
  }

  return {
    login: onLoginReset,
    logout,
    isAuthenticated,
    isLoading: onLogin.isPending,
    error: onLogin.error?.message,
  };
}