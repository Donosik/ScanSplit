import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { GroupDetail } from '@/types';

interface GroupMembersListProps {
  members: GroupDetail['members'];
  onRemoveMember?: (memberId: number) => void; 
  // ^ Optional callback for "Remove" if you want to handle it outside
}

export function GroupMembersList({ members, onRemoveMember }: GroupMembersListProps) {
  return (
    <div className="space-y-2">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-2 rounded-lg hover:bg-muted"
        >
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">{member.name}</p>
              <p className="text-xs text-muted-foreground">
                {member.username}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemoveMember?.(member.id)}
          >
            Remove
          </Button>
        </div>
      ))}
    </div>
  );
}