import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../lib/adminApi';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ADMIN_BASE_PATH } from '../../lib/adminConfig';
import AdminLayout from '../components/AdminLayout';

interface Post {
  id: number;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  authorName: string | null;
  category: string | null;
  updatedAt: string;
}

export default function PostsListPage() {
  const { user } = useAdminAuth();
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState('');
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const res = await adminApi.get('/posts');
      setPosts(res.posts);
    } catch (err: any) {
      setError(err.message || 'Could not load posts');
    }
  }

  async function handleDelete(id: number, title: string) {
    if (!window.confirm(`Delete "${title}"? This can't be undone.`)) return;
    setDeletingId(id);
    try {
      await adminApi.delete(`/posts/${id}`);
      setPosts((prev) => prev?.filter((p) => p.id !== id) ?? null);
    } catch (err: any) {
      setError(err.message || 'Could not delete post');
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#004E99]">Posts</h1>
          <p className="text-gray-500 font-medium text-sm mt-1">Manage your blog content.</p>
        </div>
        <Link
          to={`/${ADMIN_BASE_PATH}/posts/new`}
          className="bg-[#004E99] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-[#003666] transition-all"
        >
          + New Post
        </Link>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-3 mb-6">
          {error}
        </div>
      )}

      {posts === null && !error && (
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {posts && posts.length === 0 && (
        <div className="bg-white rounded-[2rem] p-16 text-center border border-gray-100">
          <p className="text-gray-500 font-medium mb-4">No posts yet.</p>
          <Link to={`/${ADMIN_BASE_PATH}/posts/new`} className="text-[#0066CC] font-bold text-sm hover:text-[#004E99]">
            Write your first post →
          </Link>
        </div>
      )}

      {posts && posts.length > 0 && (
        <div className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-4 font-bold text-[#414752]">Title</th>
                <th className="px-6 py-4 font-bold text-[#414752]">Status</th>
                <th className="px-6 py-4 font-bold text-[#414752]">Author</th>
                <th className="px-6 py-4 font-bold text-[#414752]">Updated</th>
                <th className="px-6 py-4 font-bold text-[#414752] text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-gray-50 last:border-0 hover:bg-[#F8FAFC] transition-colors">
                  <td className="px-6 py-4 font-semibold text-[#004E99]">{post.title}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        post.status === 'published' ? 'bg-[#F0F9E8] text-[#426900]' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {post.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-medium">{post.authorName || '—'}</td>
                  <td className="px-6 py-4 text-gray-500 font-medium">
                    {new Date(post.updatedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-4">
                      <Link to={`/${ADMIN_BASE_PATH}/posts/${post.id}/edit`} className="text-[#0066CC] font-bold hover:text-[#004E99] transition-colors">
                        Edit
                      </Link>
                      {(user?.role === 'admin') && (
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          disabled={deletingId === post.id}
                          className="text-red-500 font-bold hover:text-red-700 transition-colors disabled:opacity-50"
                        >
                          {deletingId === post.id ? 'Deleting...' : 'Delete'}
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
  );
}
