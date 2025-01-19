import { useState, useEffect } from 'react';
import { Group, GroupDetail } from '@/types';
import { getGroups, getGroupById } from '@/services/groupService';

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGroups();
  }, []);

  const fetchGroups = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedGroups = await getGroups();
      console.log(fetchedGroups);

      setGroups(fetchedGroups);
    } catch (err) {
      setError('Failed to fetch groups');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const selectGroup = async (groupId: number) => {
    setSelectedGroup(groupId);
    try {
      setIsLoading(true);
      setError(null);
      const detail = await getGroupById(groupId);
      setGroupDetail(detail);
    } catch (err) {
      setError('Failed to fetch group details');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
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
    isLoading,
    error,
    refreshGroups: fetchGroups,
  };
}