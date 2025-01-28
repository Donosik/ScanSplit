import { useState, useEffect } from 'react';
import { cloudStorageService } from '@/services/cloudStorageService';

interface UseCloudImageReturn {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  refreshUrl: () => Promise<void>;
}

const URL_CACHE = new Map<string, { url: string; expiry: number }>();
const URL_EXPIRY_TIME = 55 * 60 * 1000; // 55 minutes in milliseconds (typical signed URL lasts 1 hour)

export function useCloudImage(objectName: string | null | undefined): UseCloudImageReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSignedUrl = async () => {
    if (!objectName) {
      setImageUrl(null);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Check cache first
      const cached = URL_CACHE.get(objectName);
      if (cached && cached.expiry > Date.now()) {
        setImageUrl(cached.url);
        return;
      }

      // Fetch new signed URL
      const signedUrl = await cloudStorageService.getSignedUrl(objectName);
      
      // Cache the URL
      URL_CACHE.set(objectName, {
        url: signedUrl,
        expiry: Date.now() + URL_EXPIRY_TIME
      });

      setImageUrl(signedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load image URL');
      setImageUrl(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSignedUrl();
  }, [objectName]);

  return {
    imageUrl,
    isLoading,
    error,
    refreshUrl: fetchSignedUrl
  };
} 