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
        </div>
      </ScrollArea>
    </div>
  );
}