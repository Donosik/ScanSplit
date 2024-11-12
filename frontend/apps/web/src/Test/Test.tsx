import React from 'react';
import { AvailableThemes, useAuth, useTheme } from '@frontend/providers';

export default function Test() {
  const auth = useAuth();
  const theme = useTheme();

  return (
    <div>
      {auth.isAuthenticated ? 'Zalogowany' : 'Niezalogowany'}
      <button onClick={() => theme.changeTheme(AvailableThemes.dark)}>toDark</button>
    </div>
  );
}
