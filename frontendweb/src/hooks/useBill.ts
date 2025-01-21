import { useState } from 'react';
import { Bill, BillStatus, MenuItem, User } from '@/types';
import { billService, BillDetailsResponse } from '@/services/billService';
import { useToast } from '@/components/ui/use-toast';

interface UseBillReturn {
  bill: Bill | null;
  loading: boolean;
  currencies: { key: string; value: string }[];
  error: string | null;
  fetchBill: (billId: number) => Promise<void>;
  fetchCurrencies: () => Promise<void>;
  updateBill: (billId: number, updates: Partial<Bill>) => Promise<void>;
  updateBillStatus: (billId: number, status: BillStatus) => Promise<void>;
  updateBillPaidBy: (billId: number, paidBy: number) => Promise<void>;
  addMenuItems: (billId: number, items: MenuItem[]) => Promise<void>;
  setCurrentBill: (bill: Bill) => void;
  updateBillName: (billId: number, name: string) => Promise<void>;
  updateBillDate: (billId: number, date: Date) => Promise<void>;
}

export function useBill(): UseBillReturn {
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<{ key: string; value: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const convertAssignedTo = (assignedTo: any) => {
    let assignedToArray: User[] = [];
    if (assignedTo == null || !assignedTo.length) {
      return assignedToArray;
    }
    return assignedTo.map((user: any) => ({
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      avatar: user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`,
    }));
  }
  const convertItems = (items: any) => {
    let itemsArray: MenuItem[] = [];
    if (items == null || !items.length) {
      return itemsArray;
    }
    return items.map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      assignedTo: convertAssignedTo(item.assignedTo)
    }));
  }

  const fetchBill = async (billId: number) => {
    try {
      setLoading(true);
      setError(null);
      const response = await billService.getBillDetails(billId);
      console.log(response);
      if (!response) {
        throw new Error('Bill not found');
      }

      // Transform the response to match the Bill interface
      const transformedBill: Bill = {
        id: response.id,
        name: response.name || 'Unnamed bill',
        date: response.date,
        amount: response.amount,
        currency: response.currency,
        status: response.status.toLowerCase() as BillStatus,
        paidBy: response.paidBy || 'Not assigned',
        image: response.image || '/default-receipt.png',
        items: convertItems(response.items)
      };
      console.log(transformedBill);

      setBill(transformedBill);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch bill details';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrencies = async () => {
    try {
      setError(null);
      const response = await billService.getAllCurrencies();
      setCurrencies(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch currencies';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    }
  };

  const updateBill = async (billId: number, updates: Partial<Bill>) => {
    try {
      setLoading(true);
      setError(null);
      await billService.updateBill(billId, updates);
      setBill(prev => prev ? { ...prev, ...updates } : null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update bill';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  
  const updateBillStatus = async (billId: number, status: BillStatus) => {
    await updateBill(billId, { status });
  };

  const updateBillPaidBy = async (billId: number, paidBy: string) => {
    await updateBill(billId, { paidBy });
  };

  const createBill = async (groupId: number, file: File, date: string, currency: string) => {
    try {
      setLoading(true);
  
      // Create bill data object
      const billData = {
        date, // Ensure this matches the required format, e.g., ISO string
        location: {
          name: 'Default Location', // Default or user-provided values
          city: 'Default City',
          country: 'Default Country',
          address: 'Default Address',
        },
        billImage: '', // Handled by backend
        name,
        currency,
      };
  
      // Prepare FormData
      const formData = new FormData();
      formData.append('Date', billData.date);
      formData.append('Location.Name', billData.location.name);
      formData.append('Location.City', billData.location.city);
      formData.append('Location.Country', billData.location.country);
      formData.append('Location.Address', billData.location.address);
      formData.append('BillImage', 'bill-image.jpg'); // Optional or leave out if unnecessary
      formData.append('Name', billData.name);
      formData.append('Currency', billData.currency);
      formData.append('image', file); // File data

      // Make API call
      const response = await billService.createBill(groupId, formData);
      const billId = response.billId.billId; 
      // add menu items
      const menuitemresponse = await billService.addMenuItemsToBill(billId, response.menuItems);
      // Handle response
      if (billId) {
        toast({
          title: "Success",
          description: "Bill created successfully",
        });
        await fetchBill(billId);
        
        return response;
      }

      throw new Error('Failed to create bill');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create bill",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const addMenuItems = async (billId: number, items: MenuItem[]) => {
    try {
      setLoading(true);
      setError(null);
      await billService.addMenuItems(billId, items);
      if (bill) {
        const updatedItems = [...bill.items, ...items];
        const totalAmount = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setBill({
          ...bill,
          items: updatedItems,
          amount: totalAmount
        });
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to add menu items';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const setCurrentBill = (newBill: Bill) => {
    setBill(newBill);
  };

  const updateBillName = async (billId: number, name: string) => {
    try {
      setLoading(true);
      setError(null);
      await billService.updateBillName(billId, name);
      await fetchBill(billId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update bill name';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBillDate = async (billId: number, date: Date) => {
    try {
      setLoading(true);
      setError(null);
      await billService.updateBillDate(billId, date);
      await fetchBill(billId);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update bill date';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    bill,
    loading,
    currencies,
    error,
    fetchBill,
    fetchCurrencies,
    updateBill,
    updateBillStatus,
    updateBillPaidBy,
    addMenuItems,
    createBill,
    setCurrentBill,
    updateBillName,
    updateBillDate,
  };
}

export async function getAllCurrencies() {
    const currencies = await billService.getAllCurrencies();
    return currencies;
}