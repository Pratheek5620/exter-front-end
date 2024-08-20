// ProtectedPage.tsx
import React from 'react';
import { useAuth } from './auth-provider';

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...Please wait!</div>;

  if (!isAuthenticated) {
    return <div>You are not authorized to view this page. Please log in.</div>;
  }

  return <>{children}</>;
};

export default ProtectedPage;
