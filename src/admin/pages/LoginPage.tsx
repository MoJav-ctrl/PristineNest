import { useState, useEffect, FormEvent } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { adminApi } from '../../lib/adminApi';
import { ADMIN_BASE_PATH } from '../../lib/adminConfig';

export default function LoginPage() {
  const { user, login } = useAdminAuth();
  const location = useLocation();
  const [setupComplete, setSetupComplete] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    adminApi
      .get('/auth/setup/status')
      .then((res) => setSetupComplete(res.setupComplete))
      .catch(() => setSetupComplete(true)); // fail safe: assume login, not setup
  }, []);

  if (user) {
    const from = (location.state as { from?: Location })?.from?.pathname || `/${ADMIN_BASE_PATH}/posts`;
    return <Navigate to={from} replace />;
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  async function handleSetup(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminApi.post('/auth/setup', { email, password, name });
      await login(email, password);
    } catch (err: any) {
      setError(err.message || 'Setup failed');
    } finally {
      setLoading(false);
    }
  }

  if (setupComplete === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="w-8 h-8 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const isSetup = setupComplete === false;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
      <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-[0_4px_20px_rgba(17,28,45,0.05)] border border-gray-50">
        <div className="mb-8">
          <span className="font-display text-2xl font-bold text-[#004E99]">PristineNest</span>
          <h1 className="text-xl font-bold text-[#004E99] mt-4">
            {isSetup ? 'Create the admin account' : 'Staff sign in'}
          </h1>
          <p className="text-sm text-gray-500 font-medium mt-1">
            {isSetup
              ? 'No admin account exists yet — set one up to get started.'
              : 'Log in to manage blog content.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-3 mb-6">
            {error}
          </div>
        )}

        <form onSubmit={isSetup ? handleSetup : handleLogin} className="flex flex-col gap-5">
          {isSetup && (
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Name</label>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
              />
            </div>
          )}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Email</label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Password</label>
            <input
              required
              type="password"
              minLength={isSetup ? 8 : undefined}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
            />
            {isSetup && <p className="text-xs text-gray-400 font-medium">At least 8 characters.</p>}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? 'Please wait...' : isSetup ? 'Create admin account' : 'Log in'}
          </button>
        </form>
      </div>
    </div>
  );
}
