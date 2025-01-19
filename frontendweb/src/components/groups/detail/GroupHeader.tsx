import { ArrowLeft, Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { GroupDetail } from '@/types';
import GroupSettings from './GroupSettings';

interface GroupHeaderProps {
  group: GroupDetail;
  onBack: () => void;
}

export default function GroupHeader({ group, onBack }: GroupHeaderProps) {
  return (
    <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full hover:bg-accent"
              onClick={onBack}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold truncate">{group.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full">
                  <Settings2 className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Group Settings</SheetTitle>
                </SheetHeader>
                <GroupSettings group={group} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}

