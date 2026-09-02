import { ReactNode } from 'react';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function RequireAdmin({ children }: { children: ReactNode }) {
  const { user } = useAdminAuth();

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#004E99] mb-2">Admins only</h1>
          <p className="text-gray-500 font-medium">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
