import React, { useEffect } from 'react';
import { AuthContextProps, Providers, useAuth } from '@frontend/providers';

export default function Test()
{
  const auth:AuthContextProps = useAuth();

  useEffect(() => {
    log().then(r =>{} )
  }, [auth.isAuthenticated]);

  async function log() {
    await auth.login('a', ':');
  }

  return (
    <Providers>
      <div>{auth.isAuthenticated ? 'Zalogowany' : 'Niezalogowany'}</div>
    </Providers>
  )
}
