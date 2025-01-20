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


  const setCurrentBill = (bill: Bill) => {

    const totalAmount = bill.items.reduce((sum, item) => sum + item.price, 0);



    const newBill = {
        id: bill.id,
        name: bill.name || "No name",
        amount: totalAmount,
        paidBy: bill.paidBy || "No paid by",
        date: bill.date || new Date().toISOString(),
        image: bill.image || "",
        status: bill.status || "pending",
        items: bill.items || [],
        groupId: bill.groupId || 0,
        currency: bill.currency || "USD",
    }
    setBill(newBill);
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
    setCurrentBill,
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