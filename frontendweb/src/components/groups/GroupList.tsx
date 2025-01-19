import { useState } from 'react';
import { PlusCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import GroupCard from './GroupCard';
import { Group } from '@/types';
import { createGroup } from '@/services/groupService';

// 1. Import your new GroupImage component
import { GroupImage } from './detail/GroupImage';

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (groupId: number) => void;
}

export default function GroupList({ groups, onSelectGroup }: GroupListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 2. Optional: Keep track of the image URL locally.
  //    By default, let's set it to the Unsplash URL you’re already using.
  const [imageSrc, setImageSrc] = useState(
    'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9'
  );

  const handleCreateGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newGroup = await createGroup({
      name: formData.get('name') as string,
      image: imageSrc, // Use the local state or a fallback
    });

    // Close dialog and select the newly-created group
    setIsDialogOpen(false);
    onSelectGroup(newGroup.id);
  };

  // 3. (Optional) Example of how to update the image
  const handleChangeImage = () => {
    // For now, just an example: you might open a file picker or set a new random URL.
    // setImageSrc('some-new-image-url');
    alert("Change Image button clicked!");
  };

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold">Your Groups</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              size="default" 
              className="w-full xs:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <PlusCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              New Group
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[calc(100%-2rem)] sm:max-w-[425px] p-4 sm:p-6">
            <DialogHeader>
              <DialogTitle>Create New Group</DialogTitle>
            </DialogHeader>

            {/* 4. Include the GroupImage component in your creation form */}
            <form onSubmit={handleCreateGroup} className="space-y-4 sm:space-y-6 py-4">
              {/* Group Name */}
              <Input name="name" placeholder="Group Name" required />

              {/* Group Image */}
              <GroupImage 
                src={imageSrc} 
                alt="New Group Image" 
                onChangeImage={handleChangeImage}
              />

              {/* Add members by username (optional) */}
              <Input name="members" placeholder="Add members by username" />

              {/* Submit */}
              <Button type="submit" className="w-full">
                Create Group
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-8rem)] xs:h-[calc(100vh-9rem)] sm:h-[calc(100vh-10rem)] lg:h-[calc(100vh-12rem)]">
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 pr-3 xs:pr-4">
          {groups.map((group) => (
            <GroupCard 
              key={group.id} 
              group={group} 
              onClick={onSelectGroup}
            />
          ))}
           {groups.length === 0 && (
              <div className="flex flex-col items-center justify-center p-8 mt-4 rounded-lg border-2 border-dashed border-muted-foreground/25">
                <svg
                  className="w-12 h-12 text-muted-foreground/50 mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No receipts yet</h3>
                <p className="text-sm text-muted-foreground/75 text-center">
                  Click the button above to add your first receipt to this event
                </p>
              </div>
            )}
        </div>
      </ScrollArea>
    </div>
  );
}