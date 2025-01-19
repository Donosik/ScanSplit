import { useState } from 'react';

interface Toast {
  title: string;
  description?: string;
  variant?: 'default' | 'destructive';
}

interface ToastState extends Toast {
  id: number;
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  const toast = ({ title, description, variant = 'default' }: Toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, title, description, variant }]);

    // Auto remove after 3 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return {
    toast,
    dismiss,
    toasts,
  };
} 