import { useEffect, useState } from 'react';
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
import { useProfile } from '@/hooks/useProfile';
import { PhotoUpload } from '@/components/shared/PhotoUpload';

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ProfileDialog({ open, onOpenChange }: ProfileDialogProps) {
  const { user, updateProfile, updatePassword, fetchUser } = useProfile();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [newAvatar, setNewAvatar] = useState<File | null>(null);

  // load the user on appear
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await updateProfile({
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      username: formData.get('username') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      avatar: newAvatar ? URL.createObjectURL(newAvatar) : undefined,
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
    const response = await updatePassword(
      formData.get('oldPassword') as string,
      formData.get('newPassword') as string,
    );

    setIsPasswordDialogOpen(false);
  };

  const handleAvatarChange = (file: File) => {
    setNewAvatar(file);
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
            {/* Enlarged Avatar Area */}
            <div className="flex justify-center mb-6">
              <PhotoUpload
                currentImage={user.avatar}
                onImageChange={handleAvatarChange}
                className="w-40 h-40" // Enlarged size for avatar area
                variant="avatar"
              />
            </div>
            {/* Profile Fields */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <Input name="name" placeholder="First Name" defaultValue={user.name} />
                <Input name="lastName" placeholder="Last Name" defaultValue={user.lastName} />
              </div>
              <Input name="username" placeholder="Username" defaultValue={user.username} />
              <Input name="email" placeholder="Email" defaultValue={user.email} type="email" />
              <Input name="phone" placeholder="Phone Number" defaultValue={user.phone} type="tel" />
            </div>
            <div className="flex gap-4">
              <Button type="submit" className="flex-1" size="lg">
                Save Changes
              </Button>
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
            <Button type="submit" className="w-full" size="lg">
              Update Password
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}