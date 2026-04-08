import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
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
    <BrowserRouter>
      <ScrollToTop />
      <Layout />
    </BrowserRouter>
  )
}
