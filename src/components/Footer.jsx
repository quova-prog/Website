import { Link } from 'react-router-dom'

const NAV = [
  { label: 'Product',       href: '/product' },
  { label: 'Why Quova',     href: '/why-quova' },
  { label: 'FX Diagnostic', href: '/diagnostic' },
  { label: 'Resources',     href: '/resources' },
  { label: 'About',         href: '/about' },
  { label: 'Contact',       href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="bg-orbit-navy text-white border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/quova-icon.png" alt="Quova" className="w-6 h-6" />
              <span className="font-bold text-lg tracking-wide uppercase">Quova</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              The Financial Risk OS for enterprises.
              One platform for FX, interest rate, commodity, and counterparty risk.
            </p>
            <p className="text-white/40 text-xs mt-4">
              Backed by Diagram Ventures
            </p>
            <div className="mt-6">
              <Link to="/contact" className="btn-primary text-sm">
                Book a Demo
              </Link>
            </div>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold text-orbit-teal uppercase tracking-widest mb-4">Platform</p>
            <ul className="space-y-3">
              {NAV.slice(0, 4).map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-white/60 hover:text-orbit-teal text-sm transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-orbit-teal uppercase tracking-widest mb-4">Company</p>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link to="/about" className="hover:text-orbit-teal transition-colors">About</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-orbit-teal transition-colors">Contact</Link>
              </li>
              <li>
                <a href="mailto:steve@quovaos.com" className="hover:text-orbit-teal transition-colors">
                  steve@quovaos.com
                </a>
              </li>
              <li className="text-white/40">Toronto, Canada</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Quova. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            FX risk is the #1 financial exposure cited by CFOs globally.{' '}
            <Link to="/contact" className="text-orbit-teal hover:underline">
              Let's fix that.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
