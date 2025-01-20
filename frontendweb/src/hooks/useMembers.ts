import { useState } from 'react';
import { Member } from '@/types';
import { getMembers, getMemberByLogin} from '@/services/memberService';

export function useMembers() {
  const [members, setMembers] = useState<Member[]>([]);

  const fetchMembers = async () => {
    const members = await getMembers();
    setMembers(members);
  };

  const fetchMemberByLogin = async (login: string) => {
    const member = await getMemberByLogin(login);
    return member;
  };



  return {
    members,
    fetchMembers,
    fetchMemberByLogin,
  };
}