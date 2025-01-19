import { useState } from 'react';
import { Share2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface User {
  id: string;
  name: string;
  avatar?: string;
}

export function InviteFriends() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [invitedUsers, setInvitedUsers] = useState<User[]>([]);

  const mockUsers = [
    { id: '1', name: 'John Doe', avatar: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Jane Smith', avatar: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Alex Johnson', avatar: '' },
  ];

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    // Simulate a search by filtering mockUsers
    const results = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term.toLowerCase()) &&
        !invitedUsers.find((u) => u.id === user.id)
    );

    setSearchResults(results);
  };

  const handleAddUser = (user: User) => {
    setInvitedUsers([...invitedUsers, user]);
    setSearchResults([]);
    setSearchTerm('');
  };

  const handleRemoveUser = (userId: string) => {
    setInvitedUsers(invitedUsers.filter((user) => user.id !== userId));
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Invite Friends
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invite Friends</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          {/* Search Input */}
          <Input
            placeholder="Search by username or phone number"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {/* Search Results */}
          {searchResults.length > 0 && (
            <div className="space-y-2">
              {searchResults.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-2 border rounded-lg hover:bg-accent/10 cursor-pointer"
                  onClick={() => handleAddUser(user)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Invited Users */}
          {invitedUsers.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Invited Friends</h4>
              <div className="flex flex-wrap gap-2">
                {invitedUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center gap-1 bg-secondary rounded-full pl-1 pr-2 py-1"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{user.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-secondary-foreground/20"
                      onClick={() => handleRemoveUser(user.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button className="w-full mt-4">Send Invites</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}