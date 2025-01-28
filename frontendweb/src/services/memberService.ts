import { api } from './api';
import { Member } from '@/types';

export const getMembers = async (): Promise<Member[]> => {
  const response = await api.get('/user/{login}');
  return response.data;
};

export const getMemberByLogin = async (login: string): Promise<Member | null> => {
    try {
        const response = await api.get(`/user/${login}`);
        const properMember: Member = {
          id: response.data.id,
          name: response.data.name,
          username: response.data.login,
          avatar: response.data.avatar,
        };
        return properMember;
    } catch (error) {
        console.error('Failed to get member by login:', error);
        return null;
    }
};



export const getMemberByPhone = async (phone: string): Promise<Member> => {
  const response = await api.get(`/user/phone/${phone}`);
  return response.data;
};