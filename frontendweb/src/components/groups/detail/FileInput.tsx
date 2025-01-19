import { ChangeEvent, useState } from 'react';
import { Upload } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileInputProps {
  onChange: (file: File | null) => void;
  className?: string;
}

export function FileInput({ onChange, className }: FileInputProps) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileName(file?.name || null);
    onChange(file);
  };

  return (
    <div className={cn("relative", className)}>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />
      <label
        htmlFor="file-upload"
        className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
      >
        <span className="flex items-center space-x-2">
          <Upload className="w-6 h-6 text-gray-600" />
          <span className="font-medium text-gray-600">
            {fileName ? fileName : "Click to upload image"}
          </span>
        </span>
      </label>
    </div>
  );
}

