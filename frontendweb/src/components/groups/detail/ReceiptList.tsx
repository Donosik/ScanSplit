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
  onAddReceipt: (name: string, file: File, date: string, currency: string) => Promise<void>;
}

export default function ReceiptList({ receipts, onSelectReceipt, onAddReceipt }: ReceiptListProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddReceipt = async (name: string, file: File, date: string, currency: string) => {
    await onAddReceipt(name, file, date, currency);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Receipts</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
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
              className="cursor-pointer hover:shadow-lg transition-shadow duration-200"
              onClick={() => onSelectReceipt(receipt)}
            >
              <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-48 h-48 sm:h-auto">
                  <img
                    src={receipt.image || "/placeholder.svg"}
                    alt={receipt.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardContent className="flex-1 p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{receipt.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Paid by {receipt.paidBy}
                      </p>
                    </div>
                    <p className="text-lg font-semibold">
                      ${receipt.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="h-4 w-4" />
                    {new Date(receipt.date).toLocaleDateString()}
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
          {receipts.length === 0 && (
            <div className="flex flex-col items-center justify-center p-8 mt-4 rounded-lg border-2 border-dashed border-muted-foreground/25">
              <svg
                className="w-12 h-12 text-muted-foreground/50 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-muted-foreground mb-2">No receipts yet</h3>
              <p className="text-sm text-muted-foreground/75 text-center">
                Click the button above to add your first receipt to this event
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

