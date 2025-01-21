import { useCloudImage } from '@/hooks/useCloudImage';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { AlertCircle } from 'lucide-react';

interface CloudImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  objectName: string | null | undefined;
  fallbackUrl?: string;
  showLoadingState?: boolean;
  showErrorState?: boolean;
}

export function CloudImage({
  objectName,
  fallbackUrl,
  showLoadingState = true,
  showErrorState = true,
  className,
  alt = '',
  ...props
}: CloudImageProps) {
  const { imageUrl, isLoading, error } = useCloudImage(objectName);

  // Show loading state
  if (isLoading && showLoadingState) {
    return <Skeleton className={cn('w-full h-full', className)} />;
  }

  // Show error state
  if (error && showErrorState) {
    return (
      <div className={cn('w-full h-full flex items-center justify-center bg-muted', className)}>
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <AlertCircle className="w-6 h-6" />
          <span className="text-sm">Failed to load image</span>
        </div>
      </div>
    );
  }

  // Show image or fallback
  return (
    <img
      src={imageUrl || fallbackUrl}
      alt={alt}
      className={cn('object-cover', className)}
      {...props}
    />
  );
} 