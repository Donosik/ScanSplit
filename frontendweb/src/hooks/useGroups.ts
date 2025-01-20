import { useState, useEffect } from 'react';
import { Group, GroupDetail } from '@/types';
import * as groupService from '@/services/groupService';
import { useToast } from '@/components/ui/use-toast';

export function useGroups() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [groupDetail, setGroupDetail] = useState<GroupDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const data = await groupService.getGroups();
      setGroups(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch groups');
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch groups. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const createGroup = async (name: string, image?: string) => {
    try {
      setLoading(true);
      const newGroup = await groupService.createGroup({ name, image });
      setGroups(prev => [...prev, newGroup]);
      toast({
        title: "Success",
        description: "Group created successfully!",
      });
      return newGroup.id;
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create group. Please try again.",
      });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addMemberByLogin = async (groupId: number, login: string) => {
    try {
      await groupService.groupService.addMemberByLogin(groupId, login);
      await fetchGroups(); // Refresh groups to get updated member count
      toast({
        title: "Success",
        description: "Member added successfully!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add member. Please check the login and try again.",
      });
      throw err;
    }
  };

  const addMemberByPhone = async (groupId: number, phoneNumber: string) => {
    try {
      await groupService.groupService.addMemberByPhone(groupId, phoneNumber);
      await fetchGroups(); // Refresh groups to get updated member count
      toast({
        title: "Success",
        description: "Member added successfully!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add member. Please check the phone number and try again.",
      });
      throw err;
    }
  };

  const updateGroupStatus = async (groupId: number, status: string) => {
    try {
      await groupService.groupService.updateGroupStatus(groupId, status);
      toast({
        title: "Success",
        description: "Group status updated successfully!",
      });
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update group status. Please try again.",
      });
      throw err;
    }
  };

  const removeMember = async (groupId: number, login: string) => {
    await groupService.groupService.removeMemberFromGroup(groupId, login);
    await fetchGroups(); // Refresh groups to get updated member count
    toast({
      title: "Success",
      description: "Member removed successfully!",
    });
  };

  const leaveGroup = async (groupId: number) => {
    await groupService.groupService.leaveGroup(groupId);
    await fetchGroups(); // Refresh groups to get updated member count
    toast({
      title: "Success",
      description: "You have left the group successfully!",
    });
  };

  const selectGroup = async (groupId: number) => {
    setSelectedGroup(groupId);
    try {
      setLoading(true);
      setError(null);
      const detail = await groupService.getGroupById(groupId);
      setGroupDetail(detail);
    } catch (err) {
      setError('Failed to fetch group details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearSelectedGroup = () => {
    setSelectedGroup(null);
    setGroupDetail(null);
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  return {
    groups,
    selectedGroup,
    groupDetail,
    selectGroup,
    clearSelectedGroup,
    loading,
    error,
    createGroup,
    addMemberByLogin,
    addMemberByPhone,
    updateGroupStatus,
    removeMember,
    leaveGroup,
    refreshGroups: fetchGroups,
  };
}