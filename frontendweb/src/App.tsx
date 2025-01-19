import { Router } from '@/utils/router/Router';
import { AllProviders } from '@/utils/allProviders/AllProviders';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <AllProviders>
      <Router />
      <Toaster />
    </AllProviders>
  );
}