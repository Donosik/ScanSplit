import { api } from './api';

export class CloudStorageError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message);
    this.name = 'CloudStorageError';
  }
}

export const cloudStorageService = {
  uploadImage: async (file: File): Promise<string> => {
    if (!file) {
      throw new CloudStorageError('No file provided');
    }

    if (!file.type.startsWith('image/')) {
      throw new CloudStorageError('File must be an image');
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await api.post<string>('/uploadImage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new CloudStorageError(
          error.response.data?.message || 'Failed to upload image',
          error.response.status
        );
      }
      throw new CloudStorageError('Network error while uploading image');
    }
  },

  getSignedUrl: async (objectName: string): Promise<string> => {
    if (!objectName) {
      throw new CloudStorageError('No object name provided');
    }

    try {
      const response = await api.get<string>(`/uploadImage/signedUrl/${objectName}`);
      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new CloudStorageError(
          error.response.data?.message || 'Failed to get signed URL',
          error.response.status
        );
      }
      throw new CloudStorageError('Network error while getting signed URL');
    }
  },

  /**
   * Helper method to determine if an error is a CloudStorageError
   */
  isCloudStorageError: (error: unknown): error is CloudStorageError => {
    return error instanceof CloudStorageError;
  }
};