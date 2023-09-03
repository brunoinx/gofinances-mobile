import { useContext } from 'react';
import { AuthContextData } from '@/contexts/auth';

export function useAuth() {
  const context = useContext(AuthContextData);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
