import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const DEFAULT_LINKS = [
  { label: 'Product',     href: '/product' },
  { label: 'Why Quova',   href: '/why-quova' },
  { label: 'FX Diagnostic', href: '/diagnostic' },
  { label: 'Resources',   href: '/resources' },
  { label: 'About',       href: '/about' },
]

export default function Nav({ links }) {
  const LINKS = links || DEFAULT_LINKS
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-orbit-navy/95 backdrop-blur-md border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/quova-icon.png" alt="Quova" className="w-14 h-14" />
          <span className="text-white font-bold text-xl tracking-wide uppercase">
            Quova
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {LINKS.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className={`nav-link text-sm font-medium ${
                location.pathname === l.href ? 'text-orbit-teal' : ''
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/contact" className="btn-primary text-sm">
            Book a Demo
            <ArrowRight />
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(v => !v)}
          aria-label="Toggle menu"
        >
          {open ? <XIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-orbit-navy border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {LINKS.map(l => (
            <Link
              key={l.href}
              to={l.href}
              className="text-white/80 hover:text-orbit-teal text-base font-medium py-1 transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-primary mt-2 justify-center">
            Book a Demo
          </Link>
        </div>
      )}
    </header>
  )
}

function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M3 6h16M3 11h16M3 16h16" stroke="white" strokeWidth="1.8"
        strokeLinecap="round" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <path d="M4 4l14 14M18 4L4 18" stroke="white" strokeWidth="1.8"
        strokeLinecap="round" />
    </svg>
  )
}
