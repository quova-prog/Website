import { useParams, Link } from 'react-router-dom'
import { posts } from '../data/blogPosts'
import SEO from '../components/SEO'

export default function BlogPost() {
  const { slug } = useParams()
  const post = posts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-orbit-navy mb-4">Post not found</h1>
          <Link to="/resources" className="btn-primary">← Back to Resources</Link>
        </div>
      </div>
    )
  }

  const others = posts.filter(p => p.slug !== slug).slice(0, 2)

  return (
    <>
      <SEO
        title={post.title}
        path={`/resources/${post.slug}`}
        description={post.excerpt}
      />
      {/* Header */}
      <div className="bg-orbit-navy pt-32 pb-20 hero-grid relative overflow-hidden">
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, rgba(0,194,168,0.07) 0%, transparent 60%)' }} />
        <div className="relative max-w-3xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <Link to="/resources" className="text-orbit-teal text-sm hover:underline">
              ← Resources
            </Link>
            <span className="text-white/20">·</span>
            <span className="bg-orbit-teal-light text-orbit-teal-dark text-xs font-bold px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight mb-6"
            style={{ letterSpacing: '-0.02em' }}>
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-white/50">
            <span>{post.author}</span>
            <span>·</span>
            <span>{post.date}</span>
            <span>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        {post.body === 'Coming soon. This post is being drafted.' ? (
          <div className="callout text-center py-12">
            <div className="text-3xl mb-4">✍️</div>
            <h2 className="text-lg font-bold text-orbit-navy mb-2">This post is being drafted</h2>
            <p className="text-orbit-gray-mid text-sm mb-6">
              Subscribe to be notified when it's published.
            </p>
            <div className="flex gap-3 max-w-sm mx-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal"
              />
              <button className="btn-primary shrink-0 text-sm py-2.5">Notify me</button>
            </div>
          </div>
        ) : (
          <div className="prose prose-lg max-w-none text-orbit-gray-mid leading-relaxed">
            {post.body}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-orbit-navy rounded-2xl p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-3">
            See how Quova addresses this in practice
          </h3>
          <p className="text-white/60 text-sm mb-6">
            Book a 30-minute demo and we'll walk through how Quova applies to
            your specific ERP stack and exposure profile.
          </p>
          <Link to="/contact" className="btn-primary px-8 py-3">Book a Demo →</Link>
        </div>

        {/* Other posts */}
        {others.length > 0 && (
          <div className="mt-16">
            <p className="section-label mb-6">More from Quova</p>
            <div className="grid md:grid-cols-2 gap-5">
              {others.map(p => (
                <Link
                  key={p.slug}
                  to={`/resources/${p.slug}`}
                  className="block bg-white rounded-xl border border-gray-100 p-6 card-hover group"
                >
                  <span className="text-xs font-bold text-orbit-teal uppercase tracking-wide">
                    {p.category}
                  </span>
                  <h3 className="font-bold text-orbit-navy group-hover:text-orbit-teal transition-colors mt-2 mb-2 text-sm leading-snug">
                    {p.title}
                  </h3>
                  <span className="text-xs text-orbit-gray">{p.readTime}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
