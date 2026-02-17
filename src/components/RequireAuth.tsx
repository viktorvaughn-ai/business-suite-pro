import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthProvider';

type Props = {
  children: React.ReactElement;
  roles?: string[];
};

export const RequireAuth: React.FC<Props> = ({ children, roles }) => {
  const { user, loading, roles: userRoles } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a minimal loading state instead of empty div
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (roles && roles.length > 0) {
    const ok = roles.some((r) => userRoles.includes(r));
    if (!ok) return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireAuth;
