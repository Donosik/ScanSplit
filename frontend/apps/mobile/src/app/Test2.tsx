import { AuthContextProps, useAuth } from '@frontend/providers';
import React from 'react';
import { Text } from 'react-native';

export default function Test2()
{
  const auth: AuthContextProps = useAuth();

  return (
      <Text>{auth.isAuthenticated ? 'Zalogowany' : 'Niezalogowany'}</Text>
  )
}
