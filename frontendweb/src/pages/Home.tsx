import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import GroupList from '@/components/groups/GroupList';
import GroupDetail from './GroupDetail';
import ReceiptDetail from './ReceiptDetail';
import { useGroups } from '@/hooks/useGroups';
import { AvailableRoutes } from '@/utils/router/availableRoutes';

export default function Home() {
  const { groupId, receiptId } = useParams();
  const navigate = useNavigate();
  const { 
    groups, 
    groupDetail, 
    selectGroup, 
    clearSelectedGroup,
    refreshGroupDetail 
  } = useGroups();

  // Handle initial load and page refreshes
  useEffect(() => {
    if (groupId) {
      selectGroup(parseInt(groupId));
    }
  }, [groupId]);

  const handleSelectGroup = (id: number) => {
    navigate(AvailableRoutes.GROUP_DETAIL.replace(':groupId', id.toString()));
  };

  const handleBack = () => {
    navigate(AvailableRoutes.HOME);
    clearSelectedGroup();
  };

  if (receiptId) {
    return <ReceiptDetail onBack={handleBack} />;
  }


  if (groupDetail) {
    return (
      <GroupDetail 
        group={groupDetail}
        onBack={handleBack}
        onUpdate={() => refreshGroupDetail(parseInt(groupId!))}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 w-full mx-auto container">
        <GroupList 
          groups={groups} 
          onSelectGroup={handleSelectGroup}
        />
      </main>
    </div>
  );
}