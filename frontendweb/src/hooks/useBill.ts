import { useState } from 'react';
import { billService } from '@/services/billService';
import { Bill, MenuItem } from '@/types';
import { useToast } from '@/components/ui/use-toast';

export function useBill(initialBill?: Bill) {
  const [bill, setBill] = useState<Bill | undefined>(initialBill);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState<string[]>([]);
  const { toast } = useToast();

  const fetchBill = async (id: number) => {
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
    }
  };
  interface BillDTO {
    date: string; // Format: ISO string (e.g., "2025-01-19T12:00:00Z")
    location: LocationDTO;
    billImage: string;
    name: string;
    currency: 'USD' | 'EUR' | 'GBP' | 'PLN' | 'JPY';
  }
  
  interface LocationDTO {
    name: string;
    city: string;
    country: string;
    address: string;
  }

  const createBill = async (groupId: number, name: string, file: File, date: string, currency: string) => {
    try {
        setLoading(true);
    
        const staticLocation: LocationDTO = {
          name: 'Main Restaurant',
          city: 'Warsaw',
          country: 'Poland',
          address: '123 Main St',
        };
    
        // Construct the bill object
        const bill: BillDTO = {
          date: date,
          location: staticLocation,
          billImage: 'static-receipt.jpg', // Placeholder or generated on backend
          name: name,
          currency: currency as 'USD' | 'EUR' | 'GBP' | 'PLN' | 'JPY',
        };
    
        // Create FormData object
        const formData = new FormData();
        formData.append('Date', bill.date);
        formData.append('Location.Name', bill.location.name);
        formData.append('Location.City', bill.location.city);
        formData.append('Location.Country', bill.location.country);
        formData.append('Location.Address', bill.location.address);
        formData.append('BillImage', bill.billImage);
        formData.append('Name', bill.name);
        formData.append('Currency', bill.currency);
        formData.append('image', file); // Binary file upload
    
        // Make the POST request
        const { billId, menuItems } = await billService.createBill(groupId, formData);
    
        // Handle response
        toast({
          title: 'Success',
          description: 'Bill created successfully',
        });
    
        return { billId, menuItems };
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to create bill',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
  };

  const addMenuItems = async (billId: number, menuItems: MenuItem[]) => {
    try {
      setLoading(true);
      await billService.addMenuItemsToBill(billId, menuItems);
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
    } finally {
      setLoading(false);
    }
  };

  const updateBillStatus = async (billId: number, status: 'pending' | 'settled') => {
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
    } finally {
      setLoading(false);
    }
  };

  const deleteBill = async (billId: number) => {
    try {
      setLoading(true);
      await billService.deleteBill(billId);
      setBill(undefined);
      
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