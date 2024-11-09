import { NativeRouter, Route, Routes } from 'react-router-native';
import { Text } from 'react-native';
import { PrivateRoute } from '@frontend/providers';
import Test2 from '../app/Test2';

export default function Router() {
  return <NativeRouter>
    <Routes>
      <Route path={"/login"} element={<Text>Logowanie</Text>}/>
      <Route element={<PrivateRoute/>}>
        <Route path={"/"} element={<Test2/>}/>
      </Route>
    </Routes>
  </NativeRouter>;
}
