import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchPublicPostBySlug, PublicPost, PublicApiError } from '../lib/publicApi';

const FALLBACK_IMAGE = '/images/blog-office.jpg';

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<PublicPost | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setPost(null);
    setNotFound(false);
    setError('');

    fetchPublicPostBySlug(slug)
      .then(setPost)
      .catch((err: PublicApiError) => {
        if (err.status === 404) {
          setNotFound(true);
        } else {
          setError(err.message || 'Could not load this article');
        }
      });
  }, [slug]);

  if (notFound) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#004E99] mb-3">Article not found</h1>
          <p className="text-gray-500 font-medium mb-8">This post may have been unpublished or moved.</p>
          <Link to="/blog" className="inline-flex bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-screen flex items-center justify-center px-6">
        <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-6 py-4">{error}</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="w-full bg-[#F8FAFC] min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-3xl mx-auto">
        <Link to="/blog" className="text-sm font-bold text-[#0066CC] hover:text-[#004E99] mb-8 inline-flex items-center gap-2">
          ← Back to Blog
        </Link>

        {post.category && (
          <span className="inline-block bg-[#e7eeff] text-[#004E99] font-bold text-xs px-4 py-2 rounded-full mb-6">
            {post.category}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#004E99] mb-6 leading-tight">{post.title}</h1>

        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium mb-10">
          {post.authorName && <span>{post.authorName}</span>}
          {post.authorName && post.publishedAt && <span>·</span>}
          {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
        </div>

        <div className="rounded-[2.5rem] overflow-hidden mb-10 shadow-[0_4px_20px_rgba(17,28,45,0.05)]">
          <img src={post.coverImageUrl || FALLBACK_IMAGE} alt={post.title} className="w-full h-auto object-cover" />
        </div>

        <div
          className="rich-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-16 bg-white rounded-[2.5rem] p-10 text-center border border-gray-50 shadow-[0_4px_20px_rgba(17,28,45,0.03)]">
          <h3 className="text-xl font-bold text-[#004E99] mb-2">Need a hand keeping your space pristine?</h3>
          <p className="text-gray-500 font-medium mb-6">Get a free, no-obligation quote in minutes.</p>
          <Link to="/quote" className="inline-flex bg-[#004E99] text-white px-8 py-3.5 rounded-full font-bold shadow-lg hover:bg-[#003666] transition-all">
            Get a Quote →
          </Link>
        </div>
      </div>
    </div>
  );
}
