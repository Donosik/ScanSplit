import { useState } from 'react';
import { billService } from '@/services/billService';
import { Bill, MenuItem } from '@/types';
import { useToast } from '@/components/ui/use-toast';

interface CreateBillDTO {
  date: string;
  location: {
    name: string;
    city: string;
    country: string;
    address: string;
  };
  billImage: string;
  name: string;
  currency: string;
}

export function useBill() {
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchBill = async (id: number) => {
    if (bill != null) {
        return bill;
    }
    try {
      setLoading(true);
      const data = await billService.getBill(id);
      setBill(data);
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch bill details",
        variant: "destructive",
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrencies = async () => {
    try {
      const data = await billService.getAllCurrencies();
      setCurrencies(data);
      return data;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch currencies",
        variant: "destructive",
      });
      return [];
    }
  };

  const createBill = async (groupId: number, name: string, file: File, date: string, currency: string) => {
    try {
      setLoading(true);

      // Create bill data
      const billData: CreateBillDTO = {
        date,
        location: {
          name: 'Default Location', // These could be added to the form later
          city: 'Default City',
          country: 'Default Country',
          address: 'Default Address',
        },
        billImage: '', // This will be set by the backend
        name,
        currency,
      };

      // Create FormData for file upload
      const formData = new FormData();
      formData.append('billData', JSON.stringify(billData));
      formData.append('image', file);

      const response = await billService.createBill(groupId, formData);
      
      if (response.billId) {
        toast({
          title: "Success",
          description: "Bill created successfully",
        });
        await fetchBill(response.billId);
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
      await billService.addMenuItemsToBill(billId, items);
      await fetchBill(billId);
      toast({
        title: "Success",
        description: "Menu items added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add menu items",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBillStatus = async (billId: number, status: Bill['status']) => {
    try {
      setLoading(true);
      await billService.updateBillStatus(billId, status);
      if (bill) {
        setBill({ ...bill, status });
      }
      toast({
        title: "Success",
        description: "Bill status updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bill status",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBillPaidBy = async (billId: number, paidBy: string) => {
    try {
      setLoading(true);
      await billService.updateBillPaidBy(billId, paidBy);
      if (bill) {
        setBill({ ...bill, paidBy });
      }
      toast({
        title: "Success",
        description: "Paid by updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update paid by",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateBill = async (billId: number, updates: Partial<Bill>) => {
    try {
      setLoading(true);
      await billService.updateBill(billId, updates);
      if (bill) {
        setBill({ ...bill, ...updates });
      }
      toast({
        title: "Success",
        description: "Bill updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bill",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteBill = async (billId: number) => {
    try {
      setLoading(true);
      await billService.deleteBill(billId);
      setBill(null);
      toast({
        title: "Success",
        description: "Bill deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete bill",
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    bill,
    loading,
    currencies,
    fetchBill,
    fetchCurrencies,
    createBill,
    addMenuItems,
    updateBillStatus,
    updateBillPaidBy,
    updateBill,
    deleteBill,
  };
}

export async function getAllCurrencies() {
    const currencies = await billService.getAllCurrencies();
    return currencies;
}

export async function getMembers(group: GroupDetail) {
    const members = group.members.map((member: any) => ({
        id: member.id,
        name: member.name,
        username: member.username,
        avatar: member.avatar,
    }));
    return members;
}