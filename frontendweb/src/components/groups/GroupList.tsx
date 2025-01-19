import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import GroupCard from './GroupCard';
import { Group } from '@/types';
import { createGroup } from '@/services/groupService';
import { CreateGroupDialog } from './CreateGroupDialog';

interface GroupListProps {
  groups: Group[];
  onSelectGroup: (groupId: number) => void;
}

export default function GroupList({ groups, onSelectGroup }: GroupListProps) {
  const handleCreateGroup = async (data: { name: string; image: string; members: any[] }) => {
    const newGroup = await createGroup({
      name: data.name,
      image: data.image,
    });
    onSelectGroup(newGroup.id);
  };

  return (
    <div className="p-3 xs:p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold">Your Groups</h2>
        <CreateGroupDialog onCreateGroup={handleCreateGroup} />
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
                <h3 className="text-lg font-medium text-muted-foreground mb-2">No groups yet</h3>
                <p className="text-sm text-muted-foreground/75 text-center">
                  Click the button above to add your first event and start splitting bills with your friends!
                </p>
              </div>
            )}
        </div>
      </ScrollArea>
    </div>
  );
}