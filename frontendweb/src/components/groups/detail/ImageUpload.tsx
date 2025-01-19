import { ChangeEvent } from 'react';

interface ImageUploadProps {
  label?: string;
  onFileChange: (file: File) => void;
}

export function ImageUpload({ label, onFileChange }: ImageUploadProps) {
  // We only render the file input here and pass the selected file back via `onFileChange`.
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium">{label}</label>}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
}