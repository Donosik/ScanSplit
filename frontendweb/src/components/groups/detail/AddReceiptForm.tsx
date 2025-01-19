import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Optional: If you have a separate ImageUpload component
// import { ImageUpload } from './ImageUpload';

interface AddReceiptFormProps {
  // Called when the user submits the new receipt
  onSubmit: (name: string, file: File) => void | Promise<void>;

  // Called if user cancels
  onCancel: () => void;
}

export function AddReceiptForm({ onSubmit, onCancel }: AddReceiptFormProps) {
  const [receiptName, setReceiptName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file.');
      return;
    }
    await onSubmit(receiptName, file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Receipt Name */}
      <Input
        placeholder="Receipt Name"
        value={receiptName}
        onChange={(e) => setReceiptName(e.target.value)}
        required
      />

      {/* File Upload (Image) */}
      <input 
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        required 
      />

      {/* Action Buttons */}
      <div className="flex justify-end gap-2 pt-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Add Receipt
        </Button>
      </div>
    </form>
  );
}