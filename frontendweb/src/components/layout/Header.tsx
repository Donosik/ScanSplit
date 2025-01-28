import { Scan, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileDialog from '@/components/profile/ProfileDialog';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/utils/auth/useAuth';

export default function Header() {
  const { isProfileOpen, setIsProfileOpen } = useProfile();
  const { logout } = useAuth();

  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="w-full mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-4 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="bg-primary p-1.5 sm:p-2 rounded-lg">
            <Scan className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold">ScanSplit</h1>
        </div>
        <div className="flex items-center gap-2">
          <ProfileDialog open={isProfileOpen} onOpenChange={setIsProfileOpen} />
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full hover:bg-accent"
            onClick={logout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}