import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { adminApi, getToken, setToken, clearToken } from '../lib/adminApi';

interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  mustChangePassword: boolean;
}

interface AdminAuthContextValue {
  user: AdminUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AdminUser>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    const token = getToken();
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      const { user: freshUser } = await adminApi.get('/auth/me');
      setUser(freshUser);
    } catch {
      // Token expired, invalid, or the account no longer exists
      clearToken();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(email: string, password: string) {
    const { token, user: loggedInUser } = await adminApi.post('/auth/login', { email, password });
    setToken(token);
    setUser(loggedInUser);
    return loggedInUser as AdminUser;
  }

  function logout() {
    clearToken();
    setUser(null);
  }

  return (
    <AdminAuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
