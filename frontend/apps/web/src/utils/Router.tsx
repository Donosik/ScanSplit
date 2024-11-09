import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from '../Test/Test';
import { PrivateRoute } from '@frontend/providers';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<>Logowanie</>} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Test/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
