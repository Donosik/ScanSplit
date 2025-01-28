import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CloudImage } from './CloudImage';

interface PhotoUploadProps {
  currentImage?: string;
  onImageChange: (file: File) => void;
  className?: string;
  aspectRatio?: 'square' | '16:9' | '4:3';
  showRemove?: boolean;
  variant?: 'default' | 'avatar' | 'receipt';
}

export function PhotoUpload({
  currentImage,
  onImageChange,
  className,
  aspectRatio = 'square',
  showRemove = true,
  variant = 'default',
}: PhotoUploadProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const aspectRatioClasses = {
    'square': 'aspect-square',
    '16:9': 'aspect-video',
    '4:3': 'aspect-[4/3]',
  };

  const variantClasses = {
    'default': '',
    'avatar': 'rounded-full overflow-hidden',
    'receipt': 'aspect-[3/4]',
  };

  const handleFileChange = (file: File) => {
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onImageChange(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files?.length) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleRemove = () => {
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div
      className={cn(
        'relative group border-2 border-dashed rounded-lg transition-colors',
        isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25',
        aspectRatioClasses[aspectRatio],
        variantClasses[variant],
        className
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <AnimatePresence>
        {previewUrl || currentImage ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <CloudImage
                objectName={currentImage}
                alt="Uploaded image"
                className="w-full h-full"
                fallbackUrl="/placeholder-image.jpg"
              />
            )}
            {showRemove && (
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground"
          >
            {variant === 'avatar' ? (
              <Camera className="w-6 h-6" />
            ) : (
              <>
                <Upload className="w-6 h-6" />
                <span className="text-sm">Drop image here or click to upload</span>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileChange(e.target.files[0])}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}