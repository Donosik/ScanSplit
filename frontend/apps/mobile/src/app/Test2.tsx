import { AuthContextProps, useAuth } from '@frontend/providers';
import React from 'react';
import {  Text, View } from 'react-native';
import { Link } from 'react-router-native';

export default function Test2() {
  const auth: AuthContextProps = useAuth();
  return (
    <View>
      <Link to={'/login'} ><Text>zaloguj</Text></Link>
      <Text>{auth.isAuthenticated ? 'Zalogowany' : 'Niezalogowany'}</Text>
    </View>
  );
}
