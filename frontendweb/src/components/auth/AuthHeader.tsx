import { ArrowLeft, Scan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { AvailableRoutes } from '@/utils/router/availableRoutes';

export default function AuthHeader() {
  const navigate = useNavigate();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-accent"
              onClick={() => navigate(AvailableRoutes.LANDING)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="bg-primary p-1.5 rounded-lg">
                <Scan className="h-5 w-5 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-bold">ScanSplit</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}