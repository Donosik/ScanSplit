import { useRef, ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';

interface GroupImageProps {
  src?: string;
  alt?: string;
  onChangeImage?: (file: File) => void; // Updated: pass the selected file to parent
}

export function GroupImage({ src, alt, onChangeImage }: GroupImageProps) {
  // 1. Use a ref to programmatically click the hidden input
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // 2. Handle the file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onChangeImage?.(file);
    }
  };

  // 3. When user clicks the "Changeee" button, trigger file input click
  const handleClickChangeImage = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-medium">Group Image</h4>
      <div className="aspect-video relative rounded-lg overflow-hidden border">
        <img
          src={src || '/placeholder.svg'}
          alt={alt || 'Group Image'}
          className="object-cover w-full h-full"
        />
        <Button 
          size="sm" 
          className="absolute bottom-2 right-2"
          onClick={handleClickChangeImage}
          type="button"
        >
          Changeee
        </Button>

        {/* 4. Hidden file input that we programmatically click */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>
    </div>
  );
}