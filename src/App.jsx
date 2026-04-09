import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Product from './pages/Product'
import WhyQuova from './pages/WhyQuova'
import FXDiagnostic from './pages/FXDiagnostic'
import Resources from './pages/Resources'
import BlogPost from './pages/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'

const SITE_PASSWORD = 'quova2026'

function PasswordGate({ children }) {
  const [authed, setAuthed] = useState(() => sessionStorage.getItem('quova_authed') === 'true')
  const [input, setInput] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (input === SITE_PASSWORD) {
      sessionStorage.setItem('quova_authed', 'true')
      setAuthed(true)
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  if (authed) return children

  return (
    <div className="min-h-screen bg-orbit-navy flex items-center justify-center px-6">
      <div className="max-w-sm w-full text-center">
        <img src="/quova-icon.png" alt="Quova" className="w-16 h-16 mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2">This site is private</h1>
        <p className="text-white/50 text-sm mb-8">Enter the access code to continue.</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Access code"
            autoFocus
            className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/30 outline-none transition-colors"
            style={{
              background: '#0F1629',
              border: `1px solid ${error ? '#ef4444' : 'rgba(255,255,255,0.1)'}`,
            }}
            onFocus={e => (e.target.style.borderColor = '#00C2A8')}
            onBlur={e => (e.target.style.borderColor = error ? '#ef4444' : 'rgba(255,255,255,0.1)')}
          />
          {error && (
            <p className="text-red-400 text-xs">Incorrect code. Try again.</p>
          )}
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-sm transition-all duration-150"
            style={{ background: '#00C2A8', color: '#0A0F1E' }}
          >
            Enter Site
          </button>
        </form>
      </div>
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

const DIAGNOSTIC_ROUTES = ['/diagnostic', '/fx-diagnostic']

const DIAGNOSTIC_NAV_LINKS = [
  { label: 'Product',    href: '/product' },
  { label: 'Why Quova',  href: '/why-quova' },
  { label: 'Resources',  href: '/resources' },
  { label: 'About',      href: '/about' },
]

function Layout() {
  const { pathname } = useLocation()
  const isDiagnostic = DIAGNOSTIC_ROUTES.includes(pathname)

  if (isDiagnostic) {
    return (
      <>
        <Nav links={DIAGNOSTIC_NAV_LINKS} />
        <Routes>
          <Route path="/diagnostic"    element={<FXDiagnostic />} />
          <Route path="/fx-diagnostic" element={<FXDiagnostic />} />
        </Routes>
      </>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <main className="flex-1">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/product"     element={<Product />} />
          <Route path="/why-quova"   element={<WhyQuova />} />
          <Route path="/why-orbit"   element={<WhyQuova />} />
          <Route path="/resources"   element={<Resources />} />
          <Route path="/resources/:slug" element={<BlogPost />} />
          <Route path="/about"       element={<About />} />
          <Route path="/contact"     element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <PasswordGate>
      <BrowserRouter>
        <ScrollToTop />
        <Layout />
      </BrowserRouter>
    </PasswordGate>
  )
}
