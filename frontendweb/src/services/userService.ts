import { User } from '@/types';

// Temporary mock data - replace with actual API calls
const mockUser: User = {
  id: 1,
  name: 'John Doe',
  username: '@johndoe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
};

export const getCurrentUser = (): User => {
  // Replace with actual API call
  return mockUser;
};

export const updateUser = async (user: Partial<User>): Promise<User> => {
  // Replace with actual API call
  return { ...mockUser, ...user };
};