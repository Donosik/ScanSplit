import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { X } from 'lucide-react';
import { Member } from '@/types';

interface SplitBetweenProps {
  members: Member[];
  assignedMembers: Member[];
  onAddMember: (memberId: string) => void;
  onRemoveMember: (memberId: number) => void;
}

export function SplitBetween({
  members,
  assignedMembers,
  onAddMember,
  onRemoveMember,
}: SplitBetweenProps) {
  return (
    <div className="space-y-2">
      {/* Label */}
      <Label>Split Between</Label>

      {/* The Select for adding a member */}
      <Select onValueChange={onAddMember}>
        <SelectTrigger>
          <SelectValue placeholder="Add person" />
        </SelectTrigger>
        <SelectContent>
          {members
            // Only show members not already assigned
            .filter((m) => !assignedMembers.find((am) => am.id === m.id))
            .map((member) => (
              <SelectItem key={member.id} value={member.id.toString()}>
                {member.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>

      {/* Assigned members list */}
      <div className="flex flex-wrap gap-2 mt-2">
        {assignedMembers.map((member) => (
          <div
            key={member.id}
            className="flex items-center gap-1 bg-secondary rounded-full pl-1 pr-2 py-1"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src={member.avatar} />
              <AvatarFallback>{member.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm">{member.name}</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-4 w-4 p-0 hover:bg-secondary-foreground/20"
              onClick={() => onRemoveMember(member.id)}
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}