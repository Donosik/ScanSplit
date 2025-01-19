import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GroupDetail } from '@/types';
import { GroupImage } from './GroupImage';
import { InviteFriends } from './InviteFriends';
import { GroupMembersList } from './GroupMembersList';

interface GroupSettingsProps {
  group: GroupDetail;
  onUpdateGroupImage?: (file: File) => void; // Example if you want to handle image updates outside
}

export default function GroupSettings({ group, onUpdateGroupImage }: GroupSettingsProps) {
  // If you want to show a preview or store the new image locally, track it in state:
  const [currentImageSrc, setCurrentImageSrc] = useState(group.image);

  // 1. Handle the new file
  const handleChangeImage = (file: File) => {
    // Example: Show a preview instantly by creating a temporary URL
    const imageURL = URL.createObjectURL(file);
    setCurrentImageSrc(imageURL);

    // If you want to upload to server or call parent callback:
    onUpdateGroupImage?.(file);
  };

  return (
    <div className="space-y-6 py-4">
      {/* Group name input */}
      <Input defaultValue={group.name} placeholder="Group Name" />

      {/* Group image with upload */}
      <GroupImage 
        src={currentImageSrc} 
        alt={group.name} 
        onChangeImage={handleChangeImage} 
      />

      {/* Invite friends + Members list */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Members</h4>
          <InviteFriends />
        </div>
        <GroupMembersList 
          members={group.members} 
          onRemoveMember={(id) => console.log('Remove member', id)}
        />
      </div>

      <Button variant="destructive" className="w-full">
        Leave Group
      </Button>
    </div>
  );
}