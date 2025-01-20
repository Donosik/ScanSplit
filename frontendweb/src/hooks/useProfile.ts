import { useState } from 'react';
import { User } from '@/types';
import { getCurrentUser, updateUser, updatePassword } from '@/services/userService';

export function useProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User>(getCurrentUser());

  const updateProfile = async (updatedUser: Partial<User>) => {
    // Build the request payload based on the required structure
    // Parse and return the updated user data
    const response = await updateUser(updatedUser)
    return response;
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    const response = await updatePassword(oldPassword, newPassword)
    return response;
  }

  const fetchUser = async () => {
    const user = await getCurrentUser();
    
    setUser(user);
  };

  return {
    user,
    isProfileOpen,
    setIsProfileOpen,
    updateProfile,
    updatePassword: changePassword,
    fetchUser,
  };
}