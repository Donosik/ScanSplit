import { useState } from 'react';
import { User } from '@/types';
import { getCurrentUser, updateUser, updatePassword } from '@/services/userService';
import { cloudStorageService } from '@/services/cloudStorageService';

export function useProfile() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [user, setUser] = useState<User>(getCurrentUser());

  const updateProfile = async (updatedUser: Partial<User>, image: File | null) => {
    // Build the request payload based on the required structure
    // Parse and return the updated user data
    console.log(image);
    let imageUrl = null;
    if (image) {
      imageUrl = await cloudStorageService.uploadImage(image);
      console.log(imageUrl);
    }
    const response = await updateUser(updatedUser, imageUrl)
    // add the new imageUrl to the user
    setUser({...user, avatar: imageUrl || "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9" });
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