import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ADMIN_BASE_PATH } from '../../lib/adminConfig';

export default function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAdminAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-8 h-8 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to={`/${ADMIN_BASE_PATH}`} state={{ from: location }} replace />;
  }

  const onChangePasswordPage = location.pathname === `/${ADMIN_BASE_PATH}/change-password`;
  if (user.mustChangePassword && !onChangePasswordPage) {
    return <Navigate to={`/${ADMIN_BASE_PATH}/change-password`} replace />;
  }

  return <>{children}</>;
}
