import { useState, useEffect, useRef, FormEvent, ChangeEvent } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { adminApi, uploadImage } from '../../lib/adminApi';
import { ADMIN_BASE_PATH } from '../../lib/adminConfig';
import AdminLayout from '../components/AdminLayout';
import RichTextEditor from '../components/RichTextEditor';

const CATEGORIES = ['Corporate Cleaning', 'Residential', 'Pest Control', 'Event Prep', 'Hygiene Tips'];

export default function PostEditorPage() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const coverInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState<'draft' | 'published' | null>(null);
  const [error, setError] = useState('');
  const [coverUploading, setCoverUploading] = useState(false);

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [currentStatus, setCurrentStatus] = useState<'draft' | 'published'>('draft');

  useEffect(() => {
    if (!isEditing) return;
    adminApi
      .get(`/posts/${id}`)
      .then((res) => {
        const post = res.post;
        setTitle(post.title);
        setExcerpt(post.excerpt || '');
        setContent(post.content || '');
        setCategory(post.category || CATEGORIES[0]);
        setCoverImageUrl(post.coverImageUrl || '');
        setCurrentStatus(post.status);
      })
      .catch((err) => setError(err.message || 'Could not load post'))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  async function handleCoverFileSelected(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setError('');
    setCoverUploading(true);
    try {
      const { url } = await uploadImage(file);
      setCoverImageUrl(url);
    } catch (err: any) {
      setError(err.message || 'Cover image upload failed');
    } finally {
      setCoverUploading(false);
    }
  }

  async function handleSave(status: 'draft' | 'published', e?: FormEvent) {
    e?.preventDefault();
    setError('');

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setSaving(status);
    try {
      const payload = { title, excerpt, content, category, coverImageUrl, status };
      if (isEditing) {
        await adminApi.put(`/posts/${id}`, payload);
      } else {
        const res = await adminApi.post('/posts', payload);
        // Switch to edit mode for this new post so subsequent saves update
        // it instead of creating duplicates.
        navigate(`/${ADMIN_BASE_PATH}/posts/${res.post.id}/edit`, { replace: true });
      }
      setCurrentStatus(status);
    } catch (err: any) {
      setError(err.message || 'Could not save post');
    } finally {
      setSaving(null);
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center py-24">
          <div className="w-8 h-8 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl">
        <Link to={`/${ADMIN_BASE_PATH}/posts`} className="text-sm font-bold text-[#0066CC] hover:text-[#004E99] mb-6 inline-block">
          ← Back to posts
        </Link>

        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#004E99]">{isEditing ? 'Edit Post' : 'New Post'}</h1>
            {isEditing && (
              <span className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-bold ${currentStatus === 'published' ? 'bg-[#F0F9E8] text-[#426900]' : 'bg-gray-100 text-gray-500'}`}>
                {currentStatus === 'published' ? 'Published' : 'Draft'}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSave('draft')}
              disabled={saving !== null}
              className="bg-white border border-gray-200 text-[#414752] px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-50 transition-all disabled:opacity-60"
            >
              {saving === 'draft' ? 'Saving...' : 'Save Draft'}
            </button>
            <button
              type="button"
              onClick={() => handleSave('published')}
              disabled={saving !== null}
              className="bg-[#004E99] text-white px-6 py-3 rounded-full font-bold text-sm shadow-lg hover:bg-[#003666] transition-all disabled:opacity-60"
            >
              {saving === 'published' ? 'Publishing...' : 'Publish'}
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-3 mb-6">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="bg-white border border-gray-100 rounded-2xl px-6 py-4 text-lg font-bold text-[#004E99] focus:ring-2 focus:ring-[#0066CC] outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Category</label>
              <div className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-gray-100 rounded-full px-6 py-3.5 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] outline-none transition-all appearance-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Cover Image</label>
              <div className="flex items-center gap-3">
                {coverImageUrl && (
                  <img src={coverImageUrl} alt="Cover" className="w-12 h-12 rounded-xl object-cover border border-gray-100" />
                )}
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={coverUploading}
                  className="bg-white border border-gray-100 text-[#0066CC] px-5 py-3 rounded-full font-bold text-sm hover:bg-[#f0f3ff] transition-all disabled:opacity-60"
                >
                  {coverUploading ? 'Uploading...' : coverImageUrl ? 'Change Image' : 'Upload Image'}
                </button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleCoverFileSelected}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">
              Excerpt <span className="normal-case font-medium text-gray-400">(optional — auto-generated from content if left blank)</span>
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={2}
              placeholder="A short summary shown in the blog listing..."
              className="bg-white border border-gray-100 rounded-2xl px-6 py-4 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] outline-none transition-all resize-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[#414752] uppercase tracking-wider">Content</label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
