import { Navigate } from 'react-router';
import { AuthContextProps } from './AuthContext';
import { useAuth } from './useAuth';
import { Outlet } from 'react-router-native';

export function PrivateRoute() {
  const auth: AuthContextProps = useAuth();
  if (!auth.isAuthenticated) {
    console.log('You are not logged in!');
    return <Navigate to={'/login'} />;
  }
  return <Outlet/>
}
