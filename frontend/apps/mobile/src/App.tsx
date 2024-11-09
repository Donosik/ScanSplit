import React from 'react';
import { Providers } from '@frontend/providers';
import Router from './utils/Router';

export default function App() {
  return (
    <Providers>
      <Router/>
    </Providers>
  );
}
