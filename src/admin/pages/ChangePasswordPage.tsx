import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminApi } from '../../lib/adminApi';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ADMIN_BASE_PATH } from '../../lib/adminConfig';
import AdminLayout from '../components/AdminLayout';

export default function ChangePasswordPage() {
  const { user, refreshUser } = useAdminAuth();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const forced = user?.mustChangePassword;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setError('New password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await adminApi.post('/auth/change-password', { currentPassword, newPassword });
      await refreshUser();
      navigate(`/${ADMIN_BASE_PATH}/posts`);
    } catch (err: any) {
      setError(err.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  }

  const form = (
    <div className="max-w-md">
      <h1 className="text-2xl font-black text-[#004E99] mb-2">
        {forced ? 'Set a new password' : 'Change your password'}
      </h1>
      <p className="text-gray-500 font-medium mb-8">
        {forced
          ? 'This account was just created with a temporary password. Choose a permanent one to continue.'
          : 'Enter your current password and choose a new one.'}
      </p>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-3 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">
            {forced ? 'Temporary password' : 'Current password'}
          </label>
          <input
            required
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">New password</label>
          <input
            required
            type="password"
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
          />
          <p className="text-xs text-gray-400 font-medium">At least 8 characters.</p>
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Confirm new password</label>
          <input
            required
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-2 bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all disabled:opacity-60 disabled:cursor-not-allowed w-fit"
        >
          {loading ? 'Saving...' : 'Save new password'}
        </button>
      </form>
    </div>
  );

  // The forced flow can't use AdminLayout's sidebar (which links to pages
  // that are blocked until the password is changed), so it renders bare.
  if (forced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] px-6">
        <div className="w-full max-w-md bg-white rounded-[2.5rem] p-10 shadow-[0_4px_20px_rgba(17,28,45,0.05)] border border-gray-50">
          {form}
        </div>
      </div>
    );
  }

  return <AdminLayout>{form}</AdminLayout>;
}
