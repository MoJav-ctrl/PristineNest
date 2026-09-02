import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ADMIN_BASE_PATH } from '../../lib/adminConfig';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { label: 'Posts', path: `/${ADMIN_BASE_PATH}/posts` },
    ...(user?.role === 'admin' ? [{ label: 'Staff', path: `/${ADMIN_BASE_PATH}/staff` }] : []),
  ];

  function handleLogout() {
    logout();
    navigate(`/${ADMIN_BASE_PATH}`);
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <aside className="w-64 bg-[#004E99] text-white flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10">
          <span className="font-display text-xl font-bold">PristineNest</span>
          <p className="text-xs text-white/60 font-medium mt-0.5">Content Admin</p>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors ${
                location.pathname.startsWith(item.path) ? 'bg-white/15 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="px-4 py-2 mb-2">
            <p className="text-sm font-semibold truncate">{user?.name}</p>
            <p className="text-xs text-white/50 truncate">{user?.email}</p>
          </div>
          <Link
            to={`/${ADMIN_BASE_PATH}/change-password`}
            className="block px-4 py-2 rounded-xl text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            Change password
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded-xl text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          >
            Log out
          </button>
        </div>
      </aside>
      <main className="flex-1 min-w-0 p-8 md:p-12">{children}</main>
    </div>
  );
}
