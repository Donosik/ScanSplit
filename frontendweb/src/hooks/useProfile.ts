import { useState } from 'react';
import { User } from '@/types';
import { getCurrentUser, updateUser } from '@/services/userService';

export function useProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User>(getCurrentUser());

  const updateProfile = async (updatedUser: Partial<User>) => {
    const updated = await updateUser({ ...user, ...updatedUser });
    setUser(updated);
  };

  return {
    user,
    isProfileOpen,
    setIsProfileOpen,
    updateProfile,
  };
}