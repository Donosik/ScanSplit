import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import Router from './utils/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <Router />
  </StrictMode>
);
