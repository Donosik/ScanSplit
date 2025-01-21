import { User } from '@/types';
import { api } from '@/services/api';
// Temporary mock data - replace with actual API calls
const mockUser: User = {
  id: 1,
  name: 'John Doe',
  username: '@johndoe',
  email: 'john@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
};

export const getCurrentUser = async (): Promise<User> => {
  // Replace with actual API call
  const response = await api.get('/user');
  const user = response.data;
  const fetchedUser = {
    id: user.id,
    name: user.name || 'Anonymous',
    lastName: user.lastName || 'set_lastName',
    username: user.login || 'set_username',
    email: user.email,
    avatar: user.image || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    phone: user.phoneNumber || 'set_phone',
  }

  return fetchedUser;
};

export const updatePassword = async (oldPassword: string, newPassword: string): Promise<User> => {
  // Replace with actual API call
  //FIXME: Check whether the oldPassword matches ;)
  const payload = newPassword
  const response = await api.put('/user/password', payload);
  return response.data;
};

export const updateUser = async (updatedUser: Partial<User>, image: string | null): Promise<User> => {
  // Replace with actual API call
    const payload = {
      id: updatedUser.id ?? 0,
      login: updatedUser.username ?? "string",
      name: updatedUser.name ?? "string",
      lastName: updatedUser.lastName ?? "string",
      phoneNumber: updatedUser.phone ?? "string",
      email: updatedUser.email ?? "string",
      image: image ?? "string", // Ensure this is a valid base64-encoded string or URL
    };
    console.log(payload);
  const response = await api.put('/user', payload);
  // http://localhost:5136/User/1/ImagePath?newPath=image.jpg
  const imageResponse = await api.patch(`/user/${updatedUser.id}/ImagePath?newPath=${image}`);
  return response.data;
};