import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AvailableRoutes } from './availableRoutes';
import Login from '@/pages/login/Login';
import Register from '@/pages/register/Register';
import PrivateRoute from '@/utils/auth/PrivateRoute';
import Landing from '@/pages/landing/Landing';
import Home from '@/pages/Home';
import GroupDetail from '@/pages/GroupDetail';
import ReceiptDetail from '@/pages/ReceiptDetail';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AvailableRoutes.LANDING} element={<Landing />} />
        <Route path={AvailableRoutes.LOGIN} element={<Login />} />
        <Route path={AvailableRoutes.REGISTER} element={<Register />} />
        <Route element={<PrivateRoute />}>
          <Route path={AvailableRoutes.HOME} element={<Home />} />
          <Route path={AvailableRoutes.GROUP_DETAIL} element={<Home />} />
          <Route path={AvailableRoutes.RECEIPT_DETAIL} element={<Home />} />
        </Route>
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}