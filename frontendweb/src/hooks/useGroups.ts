import { useState } from 'react';
import { Group, GroupDetail } from '@/types';
import { getGroups, getGroupById } from '@/services/groupService';

export function useGroups() {
  const [groups] = useState<Group[]>(getGroups());
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null);

  const selectGroup = (groupId: number) => {
    setSelectedGroup(groupId);
    const detail = getGroupById(groupId);
    setGroupDetail(detail);
  };

  const clearSelectedGroup = () => {
    setSelectedGroup(null);
    setGroupDetail(null);
  };

  return {
    groups,
    selectedGroup,
    groupDetail,
    selectGroup,
    clearSelectedGroup,
  };
}