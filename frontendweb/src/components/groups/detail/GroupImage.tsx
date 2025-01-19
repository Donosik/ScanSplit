import { useRef, ChangeEvent } from 'react';
import { PhotoUpload } from '@/components/shared/PhotoUpload';
import { Label } from '@/components/ui/label';

interface GroupImageProps {
  src?: string;
  alt?: string;
  onChangeImage?: (file: File) => void;
}

export function GroupImage({ src, alt, onChangeImage }: GroupImageProps) {
  return (
    <div className="space-y-2">
      <Label>Group Image</Label>
      <PhotoUpload
        currentImage={src}
        onImageChange={onChangeImage || (() => {})}
        aspectRatio="16:9"
        showRemove={false}
      />
    </div>
  );
}