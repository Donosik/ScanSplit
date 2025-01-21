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
  const { removeMember, leaveGroup, updateGroupName } = useGroups();
  const [groupName, setGroupName] = useState(group.name);

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

  // Handle saving the updated group name
  const handleGroupNameChange = async () => {
    if (groupName.trim() === group.name) {
      // If the name hasn't changed, don't make a request
      return;
    }

    try {
      await updateGroupName(group.id, groupName);
      // Optionally display success feedback (handled by the hook in toast)
    } catch (err) {
      console.error('Failed to update group name:', err);
    }
  };


  return (
    <div className="space-y-6 py-4">
       {/* Group name input and Save button */}
       <div className="flex items-center gap-4">
        <Input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)} // Update groupName state
          placeholder="Group Name"
        />
        <Button onClick={handleGroupNameChange}>Save</Button> {/* Save button */}
      </div>

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