import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GroupDetail } from '@/types';
import { GroupImage } from './GroupImage';
import { InviteFriends } from './InviteFriends';
import { GroupMembersList } from './GroupMembersList';
import { useGroups } from '@/hooks/useGroups';

interface GroupSettingsProps {
  group: GroupDetail;
  onUpdateGroupImage?: (file: File) => void; // Example if you want to handle image updates outside
}

export default function GroupSettings({ group, onUpdateGroupImage }: GroupSettingsProps) {
  // If you want to show a preview or store the new image locally, track it in state:
  const [currentImageSrc, setCurrentImageSrc] = useState(group.image);
  const { removeMember, leaveGroup, updateGroupImage } = useGroups();

  const onRemoveMember = async (login: string) => {
    await removeMember(group.id, login);
  };
  // 1. Handle the new file
  const handleChangeImage = async (file: File) => {
    // Example: Show a preview instantly by creating a temporary URL
    // const imageURL = URL.createObjectURL(file);
    const imageURL = await updateGroupImage(group.id, file);
    setCurrentImageSrc(imageURL);

    // If you want to upload to server or call parent callback:
    onUpdateGroupImage?.(file);
  };

  const handleLeaveGroup = async () => {
    await leaveGroup(group.id);
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
          {/* <InviteFriends groupId={group.id} /> */}
        </div>
        <GroupMembersList 
          members={group.members} 
          onRemoveMember={onRemoveMember}

        />
      </div>

      <Button variant="destructive" className="w-full" onClick={handleLeaveGroup}>
        Leave Group
      </Button>
    </div>
  );
}