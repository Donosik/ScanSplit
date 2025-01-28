import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PhotoUpload } from '@/components/shared/PhotoUpload';

interface AddReceiptFormProps {
  // Called when the user submits the new receipt
  onSubmit: (name: string, file: File, date: string, currency: string) => void | Promise<void>;

  // Called if the user cancels
  onCancel: () => void;

  // Default currency from the group
  defaultCurrency?: string;
}

export function AddReceiptForm({ onSubmit, onCancel, defaultCurrency = 'USD' }: AddReceiptFormProps) {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState(defaultCurrency);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) return;

    try {
      setLoading(true);
      await onSubmit(name, file, date, currency);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[75vh] overflow-y-auto px-4 py-2"
      style={{
        scrollbarWidth: 'none', // Hide scrollbar for Firefox
        msOverflowStyle: 'none', // Hide scrollbar for IE and Edge
      }}
    >
      <style>
        {`
          form::-webkit-scrollbar {
            display: none; /* Hide scrollbar for WebKit browsers */
          }
        `}
      </style>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Receipt Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter receipt name"
            required
          />
        </div>
        <div>
          <Label htmlFor="date">Receipt Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="currency">Currency</Label>
          <Input
            id="currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            placeholder="Enter currency"
            required
          />
        </div>
        <div>
          <Label>Receipt Image</Label>
          <PhotoUpload
            onImageChange={setFile}
            variant="receipt"
            className="mt-2"
          />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={loading || !file}>
          {loading ? 'Adding...' : 'Add Receipt'}
        </Button>
      </div>
    </form>
  );
}