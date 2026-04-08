import { Link } from 'react-router-dom'
import { posts } from '../data/blogPosts'

function PageHeader() {
  return (
    <div className="bg-orbit-navy pt-32 pb-20 hero-grid relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 30% 60%, rgba(0,194,168,0.07) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="section-label text-orbit-teal mb-4">Resources</p>
        <h1 className="text-5xl font-black text-white mb-4" style={{ letterSpacing: '-0.03em' }}>
          FX Intelligence
        </h1>
        <p className="text-white/60 text-xl max-w-xl">
          Thought leadership on corporate FX risk, treasury operations,
          and the infrastructure gap.
        </p>
      </div>
    </div>
  )
}

function PostCard({ post, featured }) {
  return (
    <Link
      to={`/resources/${post.slug}`}
      className={`block bg-white rounded-2xl border border-gray-100 card-hover group overflow-hidden ${
        featured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image placeholder */}
      <div className={`bg-orbit-navy relative overflow-hidden ${featured ? 'h-48' : 'h-32'}`}>
        <div className="absolute inset-0 hero-grid opacity-60" />
        <div className="absolute inset-0 flex items-end p-5">
          <span className="bg-orbit-teal-light text-orbit-teal-dark text-xs font-bold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-7">
        <div className="flex items-center gap-3 text-xs text-orbit-gray mb-3">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime}</span>
        </div>
        <h2 className={`font-bold text-orbit-navy group-hover:text-orbit-teal transition-colors leading-snug mb-3 ${
          featured ? 'text-xl' : 'text-base'
        }`}>
          {post.title}
        </h2>
        <p className="text-orbit-gray text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
        <div className="mt-4 flex items-center gap-2 text-orbit-teal text-xs font-semibold">
          <span>Read article</span>
          <span>→</span>
        </div>
      </div>
    </Link>
  )
}

export default function Resources() {
  const [featured, ...rest] = posts

  return (
    <>
      <PageHeader />
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <PostCard post={featured} featured />
            <PostCard post={rest[0]} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {rest.slice(1).map(p => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter signup */}
      <section className="py-16 bg-orbit-gray-light/40 border-t border-gray-100">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="section-label mb-3">Stay current</p>
          <h2 className="text-2xl font-bold text-orbit-navy mb-3">
            FX headwinds hitting your portfolio companies?
          </h2>
          <p className="text-orbit-gray-mid text-sm mb-6">
            Quova monitors S&P and TSX earnings calls for FX-related commentary.
            Subscribe for weekly intelligence.
          </p>
          <div className="flex gap-3">
            <input
              type="email"
              placeholder="Treasury email"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal focus:border-transparent"
            />
            <button className="btn-primary shrink-0">Subscribe</button>
          </div>
          <p className="text-xs text-orbit-gray mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </section>
    </>
  )
}
