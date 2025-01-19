import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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
  const [previewUrl, setPreviewUrl] = useState<string>(currentImage || '');
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
    setPreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={cn('relative group', variantClasses[variant], className)}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files?.length) {
            handleFileChange(e.target.files[0]);
          }
        }}
      />

      <div
        className={cn(
          'relative overflow-hidden rounded-lg border-2 border-dashed transition-all',
          aspectRatioClasses[aspectRatio],
          isDragging ? 'border-primary' : 'border-muted-foreground/25',
          !previewUrl && 'hover:border-primary/50',
          variantClasses[variant]
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <AnimatePresence>
          {previewUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative h-full w-full"
            >
              <img
                src={previewUrl}
                alt="Preview"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <Button
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Camera className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                {showRemove && (
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleRemove}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Remove
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground"
            >
              <div className="rounded-full bg-muted p-4">
                {variant === 'avatar' ? (
                  <Camera className="h-6 w-6" />
                ) : (
                  <ImageIcon className="h-6 w-6" />
                )}
              </div>
              <div className="text-center">
                <p className="text-sm font-medium">
                  Drop your image here or{' '}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="text-primary underline underline-offset-4 hover:text-primary/80"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs">Supports JPG, PNG, GIF</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}