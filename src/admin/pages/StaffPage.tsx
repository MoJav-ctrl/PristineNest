import { useState, useEffect, FormEvent } from 'react';
import { adminApi } from '../../lib/adminApi';
import { useAdminAuth } from '../../context/AdminAuthContext';
import AdminLayout from '../components/AdminLayout';
import RequireAdmin from '../components/RequireAdmin';

interface StaffMember {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'staff';
  mustChangePassword: boolean;
  createdAt: string;
}

export default function StaffPage() {
  const { user } = useAdminAuth();
  const [staff, setStaff] = useState<StaffMember[] | null>(null);
  const [error, setError] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newRole, setNewRole] = useState<'staff' | 'admin'>('staff');
  const [creating, setCreating] = useState(false);
  const [revealedPassword, setRevealedPassword] = useState<{ email: string; password: string } | null>(null);
  const [busyId, setBusyId] = useState<number | null>(null);

  useEffect(() => {
    loadStaff();
  }, []);

  async function loadStaff() {
    try {
      const res = await adminApi.get('/auth/staff');
      setStaff(res.staff);
    } catch (err: any) {
      setError(err.message || 'Could not load staff');
    }
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      const res = await adminApi.post('/auth/staff', { email: newEmail, name: newName, role: newRole });
      setRevealedPassword({ email: newEmail, password: res.tempPassword });
      setNewEmail('');
      setNewName('');
      setNewRole('staff');
      setShowCreateForm(false);
      await loadStaff();
    } catch (err: any) {
      setError(err.message || 'Could not create staff account');
    } finally {
      setCreating(false);
    }
  }

  async function handleResetPassword(id: number, email: string) {
    if (!window.confirm(`Reset the password for ${email}? Their current password will stop working.`)) return;
    setBusyId(id);
    try {
      const res = await adminApi.post(`/auth/staff/${id}/reset-password`);
      setRevealedPassword({ email, password: res.tempPassword });
    } catch (err: any) {
      setError(err.message || 'Could not reset password');
    } finally {
      setBusyId(null);
    }
  }

  async function handleDelete(id: number, email: string) {
    if (!window.confirm(`Remove ${email}? They'll lose access immediately.`)) return;
    setBusyId(id);
    try {
      await adminApi.delete(`/auth/staff/${id}`);
      setStaff((prev) => prev?.filter((s) => s.id !== id) ?? null);
    } catch (err: any) {
      setError(err.message || 'Could not remove staff account');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <RequireAdmin>
      <AdminLayout>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#004E99]">Staff</h1>
            <p className="text-gray-500 font-medium text-sm mt-1">Manage who can publish to the blog.</p>
          </div>
          <button
            onClick={() => setShowCreateForm((v) => !v)}
            className="bg-[#004E99] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-[#003666] transition-all"
          >
            {showCreateForm ? 'Cancel' : '+ Add Staff'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-3 mb-6">
            {error}
          </div>
        )}

        {revealedPassword && (
          <div className="bg-[#F0F9E8] border border-[#82C300]/30 rounded-2xl px-6 py-5 mb-6">
            <p className="font-bold text-[#314f00] mb-1">Temporary password for {revealedPassword.email}</p>
            <p className="text-sm text-[#314f00]/80 font-medium mb-3">
              Copy this and share it with them directly — it won't be shown again. They'll be asked to set their own password on first login.
            </p>
            <div className="flex items-center gap-3">
              <code className="bg-white px-4 py-2 rounded-xl font-mono text-sm text-[#004E99] border border-[#82C300]/20">
                {revealedPassword.password}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(revealedPassword.password)}
                className="text-sm font-bold text-[#426900] hover:text-[#314f00]"
              >
                Copy
              </button>
              <button
                onClick={() => setRevealedPassword(null)}
                className="text-sm font-bold text-gray-400 hover:text-gray-600 ml-auto"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {showCreateForm && (
          <form onSubmit={handleCreate} className="bg-white rounded-[2rem] border border-gray-100 p-8 mb-8 flex flex-col gap-5 max-w-lg">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Name</label>
              <input
                required
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Email</label>
              <input
                required
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="bg-[#f0f3ff]/60 border border-gray-100 rounded-full px-6 py-3 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] focus:bg-white outline-none transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Role</label>
              <div className="inline-flex bg-[#f0f3ff]/60 rounded-full p-1.5 border border-gray-100 w-fit">
                <button
                  type="button"
                  onClick={() => setNewRole('staff')}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${newRole === 'staff' ? 'bg-[#004E99] text-white shadow-md' : 'text-gray-500'}`}
                >
                  Staff
                </button>
                <button
                  type="button"
                  onClick={() => setNewRole('admin')}
                  className={`px-5 py-2 rounded-full font-bold text-sm transition-all ${newRole === 'admin' ? 'bg-[#004E99] text-white shadow-md' : 'text-gray-500'}`}
                >
                  Admin
                </button>
              </div>
              <p className="text-xs text-gray-400 font-medium">Admins can also manage staff accounts.</p>
            </div>
            <button
              type="submit"
              disabled={creating}
              className="mt-2 bg-[#426900] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-[#314f00] transition-all disabled:opacity-60 w-fit"
            >
              {creating ? 'Creating...' : 'Create account'}
            </button>
          </form>
        )}

        {staff === null && !error && (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {staff && staff.length > 0 && (
          <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 text-left">
                  <th className="px-6 py-4 font-bold text-[#414752]">Name</th>
                  <th className="px-6 py-4 font-bold text-[#414752]">Email</th>
                  <th className="px-6 py-4 font-bold text-[#414752]">Role</th>
                  <th className="px-6 py-4 font-bold text-[#414752]">Status</th>
                  <th className="px-6 py-4 font-bold text-[#414752] text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {staff.map((member) => (
                  <tr key={member.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F8FAFC] transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#004E99]">
                      {member.name}
                      {member.id === user?.id && <span className="text-gray-400 font-medium"> (you)</span>}
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">{member.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${member.role === 'admin' ? 'bg-[#e7eeff] text-[#0066CC]' : 'bg-gray-100 text-gray-500'}`}>
                        {member.role === 'admin' ? 'Admin' : 'Staff'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {member.mustChangePassword ? (
                        <span className="text-xs font-bold text-amber-600">Awaiting first login</span>
                      ) : (
                        <span className="text-xs font-bold text-[#426900]">Active</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-4">
                        <button
                          onClick={() => handleResetPassword(member.id, member.email)}
                          disabled={busyId === member.id}
                          className="text-[#0066CC] font-bold hover:text-[#004E99] transition-colors disabled:opacity-50"
                        >
                          Reset password
                        </button>
                        {member.id !== user?.id && (
                          <button
                            onClick={() => handleDelete(member.id, member.email)}
                            disabled={busyId === member.id}
                            className="text-red-500 font-bold hover:text-red-700 transition-colors disabled:opacity-50"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </AdminLayout>
    </RequireAdmin>
  );
}
