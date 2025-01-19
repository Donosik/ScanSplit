import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { PlusCircle, X } from 'lucide-react';
import { GroupImage } from './detail/GroupImage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Member } from '@/types';
import { useToast } from '@/hooks/use-toast';
import { useMembers } from '@/hooks/useMembers';

interface CreateGroupDialogProps {
  onCreateGroup: (data: { name: string; image: string; members: Member[] }) => void;
}

export function CreateGroupDialog({ onCreateGroup }: CreateGroupDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'details' | 'members'>('details');
  const [groupName, setGroupName] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<Member[]>([]);
  const { toast } = useToast();
  const { fetchMemberByLogin } = useMembers();
  // Mock members data - replace with actual API call
  const mockMembers: Member[] = [
    { id: 1, name: 'John Doe', username: '@johndoe', avatar: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Jane Smith', username: '@janesmith', avatar: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Mike Johnson', username: '@mikej', avatar: 'https://via.placeholder.com/150' },
  ];

  const handleNext = () => {
    if (!groupName.trim()) {
      toast({
        title: 'Group name required',
        description: 'Please enter a name for your group',
        variant: 'destructive',
      });
      return;
    }
    setStep('members');
  };

  const handleCreate = () => {
    onCreateGroup({
      name: groupName,
      image: imageSrc,
      members: selectedMembers,
    });
    setIsOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setGroupName('');
    setImageSrc('');
    setSelectedMembers([]);
    setSearchTerm('');
    setStep('details');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetForm();
    }
  };

  const handleImageChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setImageSrc(url);
  };

  const handleSearch = async (term: string) => {
    setSearchTerm(term);

    // Filter the mock members to simulate search results
    // const results = mockMembers.filter(
    //   (member) =>
    //     member.name.toLowerCase().includes(term.toLowerCase()) ||
    //     member.username.toLowerCase().includes(term.toLowerCase())
    // );
    const results = await fetchMemberByLogin(term);
    if (results) {
      setSearchResults([results]);
    }else{
      setSearchResults([]);
    }

    // setSearchResults(results.filter((member) => !selectedMembers.some((m) => m.id === member.id)));
  };

  const handleAddMember = (member: Member) => {
    setSelectedMembers([...selectedMembers, member]);
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleRemoveMember = (memberId: number) => {
    setSelectedMembers(selectedMembers.filter((member) => member.id !== memberId));
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="default"
          className="w-full xs:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200"
        >
          <PlusCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
          New Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{step === 'details' ? 'Create New Group' : 'Add Members'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {step === 'details' ? (
            <>
              {/* Group Name */}
              <Input
                placeholder="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                className="mb-4"
              />

              {/* Group Image */}
              <GroupImage src={imageSrc} alt="Group Image" onChangeImage={handleImageChange} />

              <Button onClick={handleNext} className="w-full">
                Next
              </Button>
            </>
          ) : (
            <>
              {/* Search Input */}
              <Input
                placeholder="Search by username or phone number"
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  {searchResults.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 border rounded-lg hover:bg-accent/10 cursor-pointer"
                      onClick={() => handleAddMember(member)}
                    >
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{member.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Selected Members */}
              {selectedMembers.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Added Members</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMembers.map((member) => (
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
                          onClick={() => handleRemoveMember(member.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 justify-end mt-4">
                <Button variant="outline" onClick={() => setStep('details')}>
                  Back
                </Button>
                <Button onClick={handleCreate}>
                  Create Group
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}