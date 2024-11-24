import { NativeRouter, Route, Routes } from 'react-router-native';
import { PrivateRoute } from '@frontend/providers';
import Test2 from '../app/Test2';
import React from 'react';
import Login from '../app/Login';

export default function Router() {
  return (
    <NativeRouter>
      <Routes>
        <Route path={'/login'} element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path={'/'} element={<Test2 />} />
        </Route>
      </Routes>
    </NativeRouter>
  );
}
