import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './useAuth';
import { AvailableRoutes } from '../router/availableRoutes';

export default function PrivateRoute() {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated()) {
    return <Navigate to={AvailableRoutes.LANDING} />;
  }
  
  return <Outlet />;
}