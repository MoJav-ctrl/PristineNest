import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { fetchPublicPosts, PublicPost } from '../lib/publicApi';

const CATEGORIES = ['Corporate Cleaning', 'Residential', 'Pest Control', 'Event Prep', 'Hygiene Tips'];
const FALLBACK_IMAGE = '/images/blog-office.jpg';

function formatDate(dateStr: string | null) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function renderPostCard(post: PublicPost, size: 'normal' | 'featured' = 'normal', key?: number) {
  const isFeatured = size === 'featured';
  return (
    <article
      key={key ?? post.id}
      className={`bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50 flex flex-col ${
        isFeatured ? 'md:flex-row' : ''
      }`}
    >
      <div className={`relative overflow-hidden ${isFeatured ? 'md:w-2/5 h-64 md:h-auto' : 'h-56'}`}>
        <img src={post.coverImageUrl || FALLBACK_IMAGE} alt={post.title} className="w-full h-full object-cover" />
        {post.category && (
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-[#004E99] shadow-sm">
            {post.category}
          </div>
        )}
      </div>
      <div className={`p-8 flex flex-col flex-grow ${isFeatured ? 'md:p-10 justify-center md:w-3/5' : ''}`}>
        <h2 className={`font-bold text-[#004E99] mb-4 leading-tight ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-2xl'}`}>
          {post.title}
        </h2>
        {post.excerpt && (
          <p className={`text-gray-600 font-medium mb-6 leading-relaxed ${isFeatured ? '' : 'line-clamp-3'}`}>
            {post.excerpt}
          </p>
        )}
        <div className="mt-auto">
          <Link to={`/blog/${post.slug}`} className="text-[#0066CC] font-bold text-sm hover:text-[#004E99] transition-colors flex items-center gap-2">
            Read Article
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<PublicPost[] | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchPublicPosts()
      .then(setPosts)
      .catch((err) => setError(err.message || 'Could not load posts'));
  }, []);

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    return posts.filter((post) => {
      const matchesSearch = search.trim()
        ? post.title.toLowerCase().includes(search.toLowerCase()) ||
          (post.excerpt || '').toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesCategory = activeCategory ? post.category === activeCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [posts, search, activeCategory]);

  const [firstTwo, feature, ...rest] = filteredPosts;
  const recentPosts = posts?.slice(0, 2) || [];

  return (
    <div className="w-full bg-[#F8FAFC] min-h-screen">
      <div className="pt-24 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

        <div className="mb-16">
          <h1 className="text-5xl font-black text-[#004E99] mb-4">Insights & Updates</h1>
          <p className="text-lg text-gray-600 font-medium max-w-2xl">
            Expert advice on facility management, hygiene standards, and maintaining pristine spaces across Nigeria.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Main Posts Area */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-medium rounded-2xl px-5 py-4">
                {error}
              </div>
            )}

            {posts === null && !error && (
              <div className="flex justify-center py-24">
                <div className="w-8 h-8 border-3 border-[#0066CC] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}

            {posts !== null && filteredPosts.length === 0 && !error && (
              <div className="bg-white rounded-[2.5rem] p-16 text-center border border-gray-50">
                <p className="text-gray-500 font-medium">
                  {posts.length === 0 ? 'No articles published yet — check back soon.' : 'No articles match your search.'}
                </p>
              </div>
            )}

            {filteredPosts.length > 0 && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {renderPostCard(firstTwo)}
                  {filteredPosts[1] && renderPostCard(filteredPosts[1])}
                </div>
                {feature && renderPostCard(feature, 'featured')}
                {rest.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {rest.map((post) => renderPostCard(post, 'normal', post.id))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-8">

            {/* Search */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
              <h3 className="text-xl font-bold text-[#004E99] mb-4">Search Articles</h3>
              <div className="relative">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search topics..."
                  className="w-full bg-[#f0f3ff] border-none rounded-full py-4 pl-12 pr-4 text-sm font-medium text-gray-700 focus:ring-2 focus:ring-[#0066CC] outline-none"
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
              <h3 className="text-xl font-bold text-[#004E99] mb-6">Categories</h3>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory((current) => (current === cat ? null : cat))}
                    className={`font-bold text-xs px-4 py-2.5 rounded-full transition-colors ${
                      activeCategory === cat ? 'bg-[#0066CC] text-white' : 'bg-[#f0f3ff] text-[#004E99] hover:bg-[#0066CC] hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Posts */}
            {recentPosts.length > 0 && (
              <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_4px_20px_rgba(17,28,45,0.03)] border border-gray-50">
                <h3 className="text-xl font-bold text-[#004E99] mb-6">Recent Posts</h3>
                <div className="flex flex-col gap-6">
                  {recentPosts.map((post, i) => (
                    <div key={post.id}>
                      {i > 0 && <div className="w-full h-px bg-gray-100 mb-6"></div>}
                      <Link to={`/blog/${post.slug}`}>
                        <h4 className="text-sm font-bold text-[#414752] mb-2 leading-tight hover:text-[#0066CC] cursor-pointer transition-colors">
                          {post.title}
                        </h4>
                        <span className="text-xs font-semibold text-gray-400">{formatDate(post.publishedAt)}</span>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-to-r from-[#e7eeff] to-[#f0f3ff] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm border border-white">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-black text-[#004E99] mb-3">Subscribe to our Newsletter</h2>
            <p className="text-gray-600 font-medium">Get the latest facility management tips and exclusive offers delivered to your inbox.</p>
          </div>
          <div className="md:w-1/2 w-full">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Email address"
                className="flex-grow bg-white border-none rounded-full py-4 px-6 text-sm font-medium focus:ring-2 focus:ring-[#0066CC] outline-none shadow-sm"
              />
              <button className="bg-[#426900] text-white px-8 py-4 rounded-full font-bold shadow-md hover:bg-[#314f00] transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
