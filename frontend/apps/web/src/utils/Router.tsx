import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../app/app';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/a" element={<>dsadas</>} />
      </Routes>
    </BrowserRouter>
  );
}

