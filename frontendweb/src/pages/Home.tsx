import Header from '@/components/layout/Header';
import GroupList from '@/components/groups/GroupList';
import GroupDetail from './GroupDetail';
import { useGroups } from '@/hooks/useGroups';

export default function Home() {
  const { groups, groupDetail, selectGroup, clearSelectedGroup } = useGroups();

  if (groupDetail) {
    return (
      <GroupDetail 
        group={groupDetail}
        onBack={clearSelectedGroup} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 w-full mx-auto container">
        <GroupList 
          groups={groups} 
          onSelectGroup={selectGroup}
        />
      </main>
    </div>
  );
}

