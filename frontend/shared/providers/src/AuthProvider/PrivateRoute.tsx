import { Navigate, Outlet } from 'react-router';
import { AuthContextProps } from './AuthContext';
import { useAuth } from './useAuth';

export function PrivateRoute() {
  const auth: AuthContextProps = useAuth();
  if (!auth.isAuthenticated) {
    console.log('You are not logged in!');
    return <Navigate to={'/login'} />;
  }
  console.log('You are logged in!');
  return <Outlet />;
}
