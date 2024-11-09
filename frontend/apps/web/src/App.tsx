import Router from './utils/Router';
import React from 'react';
import { Providers } from '@frontend/providers';

export default function App() {
  return (
    <Providers>
      <Router />
    </Providers>
  );
}
