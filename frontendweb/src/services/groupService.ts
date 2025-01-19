import { Group, GroupDetail } from '@/types';

// Temporary mock data - replace with actual API calls
const mockGroups: Group[] = [
  {
    id: 1,
    name: 'Weekend Trip to NYC',
    date: '2024-03-15',
    members: 4,
    receipts: 8,
    totalAmount: 1250.75,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
  },
  {
    id: 2,
    name: 'Dinner Party',
    date: '2024-03-10',
    members: 6,
    receipts: 3,
    totalAmount: 385.50,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
  },
];

const mockMembers = [
  { id: 1, name: 'John Doe', username: '@johndoe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e' },
  { id: 2, name: 'Jane Smith', username: '@janesmith', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80' },
  { id: 3, name: 'Mike Johnson', username: '@mikej', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e' },
  { id: 4, name: 'Sarah Wilson', username: '@sarahw', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330' },
];

const mockGroupDetail: GroupDetail = {
  id: 1,
  name: 'Weekend Trip to NYC',
  date: '2024-03-15',
  image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
  totalAmount: 1250.75,
  myAmount: 312.68,
  members: mockMembers,
  receipts: [
    {
      id: 1,
      name: 'Hotel Stay',
      amount: 650.00,
      paidBy: 'John Doe',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      status: 'settled',
      items: [
        {
          id: 1,
          name: 'Room Rate',
          price: 550.00,
          quantity: 1,
          assignedTo: mockMembers,
        },
        {
          id: 2,
          name: 'Room Service',
          price: 50.00,
          quantity: 2,
          assignedTo: [mockMembers[0], mockMembers[1]],
        },
      ],
    },
    {
      id: 2,
      name: 'Dinner at Le Bernardin',
      amount: 425.50,
      paidBy: 'Jane Smith',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0',
      status: 'pending',
      items: [
        {
          id: 3,
          name: 'Main Course',
          price: 85.00,
          quantity: 4,
          assignedTo: mockMembers,
        },
        {
          id: 4,
          name: 'Wine Bottle',
          price: 85.50,
          quantity: 1,
          assignedTo: [mockMembers[0], mockMembers[1], mockMembers[2]],
        },
      ],
    },
  ],
  balances: [
    { from: 'Jane Smith', to: 'John Doe', amount: 125.50 },
    { from: 'Mike Johnson', to: 'Sarah Wilson', amount: 75.25 },
    { from: 'Sarah Wilson', to: 'John Doe', amount: 50.00 },
  ],
};

export const getGroups = (): Group[] => {
  // Replace with actual API call
  return mockGroups;
};

export const getGroupById = (id: number): GroupDetail => {
  // Replace with actual API call
  return mockGroupDetail;
};

export const createGroup = async (group: Partial<Group>): Promise<Group> => {
  // Replace with actual API call
  return {
    id: Math.random(),
    name: group.name || '',
    date: new Date().toISOString(),
    members: 1,
    receipts: 0,
    totalAmount: 0,
    image: group.image || '',
  };
};

export const updateGroup = async (id: number, group: Partial<Group>): Promise<Group> => {
  // Replace with actual API call
  return { ...mockGroups[0], ...group };
};

export const deleteGroup = async (id: number): Promise<void> => {
  // Replace with actual API call
};