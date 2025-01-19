import { PlusCircle, CalendarDays } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Receipt } from '@/types';
import { useState } from 'react';
import { AddReceiptForm } from './AddReceiptForm';

interface ReceiptListProps {
  receipts: Receipt[];
  onSelectReceipt: (receipt: Receipt) => void;
  onAddReceipt: (name: string, file: File) => Promise<void>;
}

export default function ReceiptList({ receipts, onSelectReceipt, onAddReceipt }: ReceiptListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddReceipt = async (name: string, file: File) => {
    await onAddReceipt(name, file);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Receipts</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200">
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Receipt
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Receipt</DialogTitle>
            </DialogHeader>
            <AddReceiptForm
              onSubmit={handleAddReceipt}
              onCancel={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="space-y-4 pr-4">
          {receipts.map((receipt) => (
            <Card 
              key={receipt.id}
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200 overflow-hidden"
              onClick={() => onSelectReceipt(receipt)}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-64 h-48 sm:h-auto">
                  <img
                    src={receipt.image || "/placeholder.svg"}
                    alt={receipt.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{receipt.name}</h3>
                      <p className="text-base text-muted-foreground">
                        Paid by {receipt.paidBy}
                      </p>
                    </div>
                    <p className="text-2xl font-semibold mt-2 sm:mt-0">
                      ${receipt.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-base text-muted-foreground">
                    <CalendarDays className="h-5 w-5" />
                    {new Date(receipt.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

