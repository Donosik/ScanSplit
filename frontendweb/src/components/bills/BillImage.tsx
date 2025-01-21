import { CloudImage } from '@/components/shared/CloudImage';
import { PhotoUpload } from '@/components/shared/PhotoUpload';
import { Label } from '@/components/ui/label';

interface BillImageProps {
  src?: string;
  alt?: string;
  onChangeImage?: (file: File) => void;
  isEditable?: boolean;
}

export function BillImage({ 
  src, 
  alt = 'Bill image', 
  onChangeImage,
  isEditable = false 
}: BillImageProps) {
  if (!isEditable) {
    return (
      <CloudImage
        objectName={src}
        alt={alt}
        className="w-full h-full object-cover rounded-lg"
        fallbackUrl="/placeholder-receipt.jpg"
      />
    );
  }

  return (
    <div className="space-y-2">
      <Label>Receipt Image</Label>
      <PhotoUpload
        currentImage={src}
        onImageChange={onChangeImage || (() => {})}
        aspectRatio="4:3"
        variant="receipt"
        showRemove={false}
      />
    </div>
  );
} 