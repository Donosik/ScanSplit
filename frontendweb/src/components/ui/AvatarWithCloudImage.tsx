import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from './avatar'; // Adjust the import path as necessary
import { CloudImage } from '@/components/shared/CloudImage';

interface AvatarWithCloudImageProps {
  objectName: string | null | undefined;
  fallbackText?: string;
  className?: string;
  alt?: string;
}

const AvatarWithCloudImage: React.FC<AvatarWithCloudImageProps> = ({
  objectName,
  fallbackText,
  className,
  alt = 'User Avatar',
}) => {
  return (
    // <Avatar className={className}>
    <div className={className}>
      <CloudImage
        objectName={objectName}
        fallbackUrl={undefined} // You can provide a fallback URL if needed
        showLoadingState={false} // Disable loading state in Avatar
        showErrorState={true} // Show error state if image fails to load
        alt={alt}
      />
      <AvatarFallback>{fallbackText || 'U'}</AvatarFallback>
    </div>
    // </Avatar>
  );
};

export default AvatarWithCloudImage; 