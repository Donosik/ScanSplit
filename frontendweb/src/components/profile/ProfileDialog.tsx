import { useState } from 'react';
import { Settings, Lock } from 'lucide-react';
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
import { useProfile } from '@/hooks/useProfile';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { user, updateProfile } = useProfile();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateProfile({
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
    });
    onOpenChange(false);
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    // Implement password change logic here
    console.log('Password change:', {
      oldPassword: formData.get('oldPassword'),
      newPassword: formData.get('newPassword'),
    });
    setIsPasswordDialogOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent">
            <Settings className="h-5 w-5" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Profile Settings</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="flex justify-center">
              <Avatar className="h-24 w-24 ring-2 ring-primary ring-offset-2">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input name="firstName" placeholder="First Name" defaultValue={user.name.split(' ')[0]} />
                <Input name="lastName" placeholder="Last Name" defaultValue={user.name.split(' ')[1]} />
              </div>
              <Input name="username" placeholder="Username" defaultValue={user.username} />
              <Input name="email" placeholder="Email" defaultValue={user.email} type="email" />
              <Input name="phone" placeholder="Phone Number" defaultValue={user.phone} type="tel" />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1" size="lg">Save Changes</Button>
              <Button type="button" variant="outline" size="lg" onClick={() => setIsPasswordDialogOpen(true)}>
                <Lock className="h-4 w-4 mr-2" />
                Change Password
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
          </DialogHeader>
          <form onSubmit={handlePasswordChange} className="space-y-6 py-4">
            <div className="space-y-4">
              <Input name="oldPassword" placeholder="Current Password" type="password" />
              <Input name="newPassword" placeholder="New Password" type="password" />
            </div>
            <Button type="submit" className="w-full" size="lg">Update Password</Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

