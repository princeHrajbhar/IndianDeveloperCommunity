// app/components/ToastProvider.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1a1a2e',
          color: '#00ff9d',
          border: '1px solid #00ff9d',
          borderRadius: '8px',
          padding: '12px 16px',
        },
        success: {
          style: {
            border: '1px solid #00ff9d',
          },
          iconTheme: {
            primary: '#00ff9d',
            secondary: '#1a1a2e',
          },
        },
        error: {
          style: {
            border: '1px solid #ff3366',
            color: '#ff3366',
          },
          iconTheme: {
            primary: '#ff3366',
            secondary: '#1a1a2e',
          },
        },
        loading: {
          style: {
            border: '1px solid #ffa500',
            color: '#ffa500',
          },
        },
      }}
    />
  );
}