import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PhotoUpload } from '@/components/shared/PhotoUpload';

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
      alert('Please upload a receipt image.');
      return;
    }
    await onSubmit(receiptName, file);
  };

  const handleFileChange = (selectedFile: File) => {
    setFile(selectedFile);
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

      {/* Photo Upload Component */}
      <PhotoUpload
        currentImage={file ? URL.createObjectURL(file) : undefined}
        onImageChange={handleFileChange}
        aspectRatio="16:9"
        showRemove
        className="w-full"
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