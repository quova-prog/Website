import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import SEO, { ORG_SCHEMA, WEBSITE_SCHEMA } from '../components/SEO'

/* ─────────────────────────────────────────────
   Stat counter hook
───────────────────────────────────────────── */
function useCountUp(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

/* ─────────────────────────────────────────────
   Intersection observer hook
───────────────────────────────────────────── */
function useInView(threshold = 0.2) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ─────────────────────────────────────────────
   HERO
───────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative min-h-screen bg-orbit-navy hero-grid flex items-center overflow-hidden">
      {/* Radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,194,168,0.08) 0%, transparent 70%)' }} />

      {/* Orbit graphic — background decoration */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.06] pointer-events-none hidden lg:block">
        <OrbitGraphic size={700} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left — copy */}
        <div>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-orbit-teal/30 rounded-full px-4 py-1.5 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orbit-teal animate-pulse" />
            <span className="text-orbit-teal text-xs font-semibold tracking-wide uppercase">
              Designed by Treasurers, for Treasurers
            </span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-black text-white leading-[1.05] tracking-tight mb-6"
            style={{ letterSpacing: '-0.03em' }}>
            The Financial Risk Operating System for Enterprises
          </h1>

          <p className="text-white/60 text-lg leading-relaxed mb-10 max-w-lg">
            One platform for FX, interest rate, commodity, and counterparty risk.
            Quova replaces fragmented, spreadsheet-driven workflows with a
            purpose-built operating system — from multi-ERP exposure aggregation to
            audit-ready hedge accounting documentation.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary px-8 py-4 text-base">
              Book a Demo
              <ArrowRight />
            </Link>
            <Link to="/diagnostic" className="btn-ghost-dark px-8 py-4 text-base">
              Take the FX Diagnostic
            </Link>
          </div>

          <p className="text-white/30 text-xs mt-6">
            Serving enterprise treasury teams at $1B–$40B revenue companies.
          </p>
        </div>

        {/* Right — feature preview card */}
        <div className="hidden lg:block">
          <DashboardMockup />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PROOF BAR
───────────────────────────────────────────── */
function ProofBar() {
  const [ref, visible] = useInView(0.3)
  const nine = useCountUp(9, 1200, visible)
  const hrs = useCountUp(195, 1400, visible)

  const stats = [
    {
      number: `$${nine}M+`,
      label: 'avg. annual FX loss per firm',
      source: 'MillTech NA Corporate FX Report 2025',
    },
    {
      number: '83%',
      label: 'cite infrastructure as the primary barrier',
      source: 'PwC Global Treasury Survey 2025',
    },
    {
      number: '15–22×',
      label: 'annual ROI with payback under one month',
      source: 'Enterprise design partner engagement',
    },
  ]

  return (
    <section ref={ref} className="bg-white border-b border-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
        {stats.map((s, i) => (
          <div key={i} className="text-center py-4 md:py-0 md:px-8 first:pt-0 last:pb-0">
            <div className="stat-number mb-1">{s.number}</div>
            <div className="text-sm font-medium text-orbit-gray-mid">{s.label}</div>
            <div className="text-xs text-orbit-gray italic mt-1">Source: {s.source}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PROBLEM ICONS
───────────────────────────────────────────── */
function FragmentedIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="2" y="6" width="14" height="12" rx="2" stroke="#00C2A8" strokeWidth="1.5" />
      <rect x="24" y="22" width="14" height="12" rx="2" stroke="#00C2A8" strokeWidth="1.5" />
      <rect x="24" y="6" width="14" height="12" rx="2" stroke="#00C2A8" strokeWidth="1.5" opacity="0.4" />
      <rect x="2" y="22" width="14" height="12" rx="2" stroke="#00C2A8" strokeWidth="1.5" opacity="0.4" />
      <path d="M16 12h3" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
      <path d="M21 12h3" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.4" />
      <path d="M16 28h3" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" opacity="0.4" />
      <path d="M21 28h3" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="2 3" />
    </svg>
  )
}

function SpreadsheetIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="4" width="32" height="32" rx="3" stroke="#00C2A8" strokeWidth="1.5" />
      <line x1="4" y1="12" x2="36" y2="12" stroke="#00C2A8" strokeWidth="1.5" />
      <line x1="4" y1="20" x2="36" y2="20" stroke="#00C2A8" strokeWidth="1.5" opacity="0.4" />
      <line x1="4" y1="28" x2="36" y2="28" stroke="#00C2A8" strokeWidth="1.5" opacity="0.4" />
      <line x1="16" y1="12" x2="16" y2="36" stroke="#00C2A8" strokeWidth="1.5" opacity="0.4" />
      <line x1="28" y1="12" x2="28" y2="36" stroke="#00C2A8" strokeWidth="1.5" opacity="0.4" />
      <circle cx="32" cy="8" r="6" fill="#0A0F1E" stroke="#00C2A8" strokeWidth="1.5" />
      <path d="M30 8h4" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 6v4" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function NoAuditIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M12 4h16l8 8v24a4 4 0 01-4 4H12a4 4 0 01-4-4V8a4 4 0 014-4z" stroke="#00C2A8" strokeWidth="1.5" />
      <path d="M28 4v8h8" stroke="#00C2A8" strokeWidth="1.5" strokeLinejoin="round" />
      <line x1="14" y1="18" x2="26" y2="18" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="14" y1="23" x2="22" y2="23" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="14" y1="28" x2="24" y2="28" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <circle cx="30" cy="30" r="7" fill="#0A0F1E" stroke="#00C2A8" strokeWidth="1.5" />
      <path d="M27 27l6 6" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M33 27l-6 6" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   PROBLEM
───────────────────────────────────────────── */
function Problem() {
  const [ref, visible] = useInView()

  const pains = [
    {
      icon: <FragmentedIcon />,
      title: 'Fragmented ERP data',
      body: 'Exposure data lives across SAP, Oracle, NetSuite and a dozen spreadsheets. No single source of truth. No real-time view.',
    },
    {
      icon: <SpreadsheetIcon />,
      title: 'Excel-dependent workflows',
      body: '195 hours per month. Manual data pulls, formula chains, version control failures. 10%+ of exposures are mishandled as a direct result.',
    },
    {
      icon: <NoAuditIcon />,
      title: 'No audit trail',
      body: 'ASC 815 and IFRS 9 require documentation that Excel cannot produce. One audit finding can cost more than the platform itself.',
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-orbit-gray-light/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="section-label mb-3">The Problem</p>
          <h2 className="text-4xl font-bold text-orbit-navy leading-tight mb-5">
            Treasury teams at $1B–$40B companies are flying blind on FX
          </h2>
          <p className="text-orbit-gray-mid text-lg leading-relaxed">
            FX risk is the #1 financial exposure cited by CFOs globally — yet
            83% of firms cite infrastructure, not cost, as the primary barrier
            to managing it well.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((p, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 border border-gray-100 card-hover ${
                visible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="mb-5">{p.icon}</div>
              <h3 className="text-lg font-bold text-orbit-navy mb-3">{p.title}</h3>
              <p className="text-orbit-gray text-sm leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>

        {/* Gap statement callout */}
        <div className="callout mt-10 max-w-3xl">
          <p className="text-sm text-orbit-gray-dark leading-relaxed">
            <strong>The gap is measurable:</strong> 91% of firms are actively hedging — but actual hedge
            ratios average 49% against targets of 70–90%. The infrastructure
            isn't keeping up with the mandate.{' '}
            <em className="text-orbit-gray text-xs">Source: PwC Global Treasury Survey 2025</em>
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   WHY NOW
───────────────────────────────────────────── */
function WhyNow() {
  const [ref, visible] = useInView()

  const forces = [
    {
      icon: '📈',
      title: 'Macro Volatility',
      subtitle: 'Tariff-Driven FX Uncertainty',
      body: 'Sustained trade policy shifts have created ongoing currency volatility — manual spreadsheet hedging can no longer keep pace with real-time repricing.',
      stat: '83%',
      statLabel: 'of CFOs cite FX as their #1 financial exposure',
      source: 'PwC Global Treasury Survey 2025',
    },
    {
      icon: '📋',
      title: 'Regulatory Expansion',
      subtitle: 'FASB ASU 2025-09',
      body: 'FASB expanded what can be hedged across FX, IR, and commodities — while raising the documentation bar. Effective for public companies starting December 2026.',
      stat: 'Dec 2026',
      statLabel: 'effective date for public companies',
      source: 'FASB ASU 2025-09, Topic 815',
    },
    {
      icon: '⚡',
      title: 'Budget Unlock',
      subtitle: 'C-Suite AI Mandates',
      body: 'CFOs are pushing departments to adopt AI-native tools — creating a new treasury technology budget line that didn\'t exist 18 months ago.',
      stat: '74%',
      statLabel: 'of treasury teams expanding AI adoption',
      source: 'PwC 2025; Kyriba CFO AI Survey 2025',
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="section-label mb-3">Why Now</p>
          <h2 className="text-4xl font-bold text-orbit-navy leading-tight mb-5">
            Three forces converging in 2026
          </h2>
          <p className="text-orbit-gray-mid text-lg leading-relaxed">
            The window for a modern financial risk platform has never been wider — or more urgent.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {forces.map((f, i) => (
            <div
              key={i}
              className={`bg-orbit-gray-light/40 rounded-2xl p-8 border border-gray-100 card-hover ${
                visible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <p className="text-orbit-teal text-xs font-bold uppercase tracking-widest mb-1">{f.title}</p>
              <h3 className="text-lg font-bold text-orbit-navy mb-3">{f.subtitle}</h3>
              <p className="text-orbit-gray text-sm leading-relaxed mb-5">{f.body}</p>
              <div className="border-t border-gray-200 pt-4">
                <div className="text-2xl font-extrabold text-orbit-teal mb-1">{f.stat}</div>
                <div className="text-xs text-orbit-gray-mid">{f.statLabel}</div>
                <div className="text-[10px] text-orbit-gray italic mt-1">Source: {f.source}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PRODUCT OVERVIEW
───────────────────────────────────────────── */
function ProductOverview() {
  const [ref, visible] = useInView()

  const capabilities = [
    {
      title: 'Exposure Hub',
      body: 'Real-time consolidation of FX exposure across all entities, ERPs, and business lines. Continuous API sync — no batch jobs, no stale data.',
      tag: 'Data Layer',
    },
    {
      title: 'Policy Engine',
      body: 'Automated hedge sizing against policy rules. Alerts on deviations. Audit-ready documentation at every step.',
      tag: 'Automation',
    },
    {
      title: 'AI Hedge Advisor',
      body: 'Glass Box AI — every recommendation includes audit-ready reasoning. ML-driven strategy, backtesting, and independent pricing benchmarks.',
      tag: 'Intelligence',
    },
    {
      title: 'Reporting & Audit',
      body: 'One-click hedge effectiveness reports, FX gain/loss analytics, and board-ready dashboards. SOC 2 Type II by design.',
      tag: 'Compliance',
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
          <div className="max-w-xl">
            <p className="section-label mb-3">Platform</p>
            <h2 className="text-4xl font-bold text-orbit-navy leading-tight">
              Trade execution is &lt;5% of the FX workflow.<br />
              <span className="text-orbit-teal">We automate the other 95%.</span>
            </h2>
          </div>
          <Link to="/product" className="btn-ghost shrink-0">
            Full Platform Overview →
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {capabilities.map((c, i) => (
            <div
              key={i}
              className={`rounded-2xl p-7 border border-gray-100 bg-white card-hover group ${
                visible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className="inline-block bg-orbit-teal-light text-orbit-teal-dark text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
                {c.tag}
              </span>
              <h3 className="text-base font-bold text-orbit-navy mb-3 group-hover:text-orbit-teal transition-colors">
                {c.title}
              </h3>
              <p className="text-orbit-gray text-sm leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   PLATFORM VISION
───────────────────────────────────────────── */
function PlatformVision() {
  const [ref, visible] = useInView()

  const modules = [
    { name: 'FX Risk', status: 'Building Now', desc: 'Currency exposure, forward contracts, options, swaps', active: true },
    { name: 'Interest Rate', status: 'Coming Soon', desc: 'Floating-rate debt, IR swaps, caps, floors, swaptions', active: false },
    { name: 'Commodities', status: 'Coming Soon', desc: 'Raw materials, commodity forwards, futures, options', active: false },
    { name: 'Counterparty', status: 'Coming Soon', desc: 'Bank limits, ISDA exposure, credit risk', active: false },
  ]

  return (
    <section ref={ref} className="py-24 bg-orbit-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="section-label text-orbit-teal mb-3">Platform Vision</p>
          <h2 className="text-4xl font-bold text-white leading-tight mb-5">
            One architecture.<br />Every financial risk.
          </h2>
          <p className="text-white/60 text-lg leading-relaxed">
            The platform layer is risk-type agnostic — built once, deployed across every module.
            Same buyer, same budget, same compliance framework, same data integrations.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((m, i) => (
            <div
              key={i}
              className={`rounded-2xl p-6 border ${
                m.active
                  ? 'bg-orbit-teal/10 border-orbit-teal/30'
                  : 'bg-white/5 border-white/10'
              } ${visible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                m.active
                  ? 'bg-orbit-teal text-white'
                  : 'bg-white/10 text-white/50'
              }`}>
                {m.status}
              </span>
              <h3 className="text-white font-bold text-lg mt-3 mb-2">{m.name}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   SOCIAL PROOF / DESIGN PARTNERS
───────────────────────────────────────────── */
function SocialProof() {
  return (
    <section className="py-20 bg-orbit-navy">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mb-12">
          Validated by enterprise treasury teams
        </p>

        <div className="max-w-2xl mx-auto">
          <blockquote className="text-white/70 text-lg leading-relaxed italic mb-4">
            "Our treasury team has validated 15–22x annual ROI with a payback period
            of under one month. The audit documentation alone eliminates weeks of
            pre-audit preparation."
          </blockquote>
          <p className="text-orbit-teal text-sm font-semibold">
            IPO-stage enterprise · Design partner
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   BUILT FOR ENTERPRISE
───────────────────────────────────────────── */
function BuiltForEnterprise() {
  const [ref, visible] = useInView()

  const capabilities = [
    {
      icon: <ERPIcon />,
      title: 'Multi-ERP Integration',
      desc: 'Native connectors for SAP S/4HANA, Oracle ERP Cloud, and NetSuite. Continuous API sync — no batch jobs, no stale data.',
    },
    {
      icon: <NeutralIcon />,
      title: 'Execution-Neutral',
      desc: 'Trade with any bank, any counterparty. Quova never restricts where you execute — best price, always.',
    },
    {
      icon: <SecurityIcon />,
      title: 'Enterprise Security',
      desc: 'SOC 2 Type II by design. SSO, role-based access control, and full audit logging from day one.',
    },
    {
      icon: <DeployIcon />,
      title: 'Deployed in Weeks',
      desc: 'Not months, not quarters. ERP connections go live in days. Full platform onboarding in 2–4 weeks.',
    },
  ]

  return (
    <section ref={ref} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="section-label mb-3">Built for Enterprise</p>
          <h2 className="text-4xl font-bold text-orbit-navy leading-tight mb-5">
            Enterprise-grade from the ground up.<br />
            <span className="text-orbit-teal">Not bolted on after the fact.</span>
          </h2>
          <p className="text-orbit-gray-mid text-lg leading-relaxed">
            Quova was architected for the security, compliance, and integration
            requirements of $1B–$40B enterprises — not retrofitted from a startup tool.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((c, i) => (
            <div
              key={i}
              className={`bg-orbit-gray-light/40 rounded-2xl p-7 border border-gray-100 card-hover ${
                visible ? 'animate-fade-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div className="mb-5">{c.icon}</div>
              <h3 className="text-base font-bold text-orbit-navy mb-3">{c.title}</h3>
              <p className="text-orbit-gray text-sm leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link to="/contact" className="btn-primary px-8 py-4 text-base">
            See It in Your Environment →
          </Link>
        </div>
      </div>
    </section>
  )
}

function ERPIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <rect x="4" y="8" width="12" height="24" rx="2" stroke="#00C2A8" strokeWidth="1.5" />
      <rect x="24" y="8" width="12" height="24" rx="2" stroke="#00C2A8" strokeWidth="1.5" />
      <path d="M16 16h8" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 20h8" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16 24h8" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="8" y1="14" x2="12" y2="14" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="8" y1="18" x2="12" y2="18" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="28" y1="14" x2="32" y2="14" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <line x1="28" y1="18" x2="32" y2="18" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

function NeutralIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke="#00C2A8" strokeWidth="1.5" />
      <path d="M12 20h16" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 12v16" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="20" r="2.5" fill="#00C2A8" opacity="0.3" />
      <circle cx="28" cy="20" r="2.5" fill="#00C2A8" opacity="0.3" />
      <circle cx="20" cy="12" r="2.5" fill="#00C2A8" opacity="0.3" />
      <circle cx="20" cy="28" r="2.5" fill="#00C2A8" opacity="0.3" />
      <circle cx="20" cy="20" r="3" fill="#00C2A8" />
    </svg>
  )
}

function SecurityIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <path d="M20 4L6 10v10c0 10 14 16 14 16s14-6 14-16V10L20 4z" stroke="#00C2A8" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M15 20l3 3 7-7" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function DeployIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="16" stroke="#00C2A8" strokeWidth="1.5" />
      <path d="M20 10v10l6 4" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 6l-3-3" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
      <path d="M30 6l3-3" stroke="#00C2A8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
    </svg>
  )
}

/* ─────────────────────────────────────────────
   TEAM SECTION
───────────────────────────────────────────── */
function Team() {
  const team = [
    {
      name: 'Steve LaBella',
      title: 'CEO & Co-Founder',
      bio: '3 exits including iSend ($100M+ revenue). Forbes Top Tech Innovator.',
    },
    {
      name: 'Mingze Deng',
      title: 'CPO & Co-Founder',
      bio: 'Architect of Quova\'s platform vision. Expert in data-intensive fintech infrastructure.',
    },
    {
      name: 'Jim McCrindle',
      title: 'Advisor',
      bio: 'Former Head of Corporate FX, North America at a major global bank. 20+ years institutional FX advisory.',
    },
  ]

  return (
    <section className="py-24 bg-orbit-gray-light/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="section-label mb-3">Team</p>
          <h2 className="text-4xl font-bold text-orbit-navy leading-tight">
            Built by operators who've done it before
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {team.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 card-hover">
              <div className="w-12 h-12 rounded-xl bg-orbit-teal-light flex items-center justify-center mb-5">
                <span className="text-orbit-teal font-bold text-lg">
                  {m.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-bold text-orbit-navy text-lg mb-1">{m.name}</h3>
              <p className="text-orbit-teal text-xs font-semibold uppercase tracking-wide mb-3">{m.title}</p>
              <p className="text-orbit-gray text-sm leading-relaxed">{m.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Link to="/about" className="text-orbit-teal text-sm font-semibold hover:underline">
            View full team and advisors →
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   BOTTOM CTA
───────────────────────────────────────────── */
function BottomCTA() {
  return (
    <section className="bg-orbit-navy py-24 relative overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(0,194,168,0.06) 0%, transparent 70%)' }} />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p className="text-orbit-teal font-semibold text-sm uppercase tracking-widest mb-6">
          Ready to see it?
        </p>
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6"
          style={{ letterSpacing: '-0.02em' }}>
          Your treasury team loses an average of{' '}
          <span className="text-orbit-teal">$9M+ per year</span>{' '}
          to FX inefficiency.
          <br />Let's fix that.
        </h2>
        <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
          A 30-minute demo will show you exactly where the leakage is
          and what Quova would look like in your environment.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="btn-primary px-10 py-4 text-base">
            Book a Demo
            <ArrowRight />
          </Link>
          <Link to="/diagnostic" className="btn-ghost-dark px-10 py-4 text-base">
            Take the Free FX Diagnostic
          </Link>
        </div>
        <p className="text-white/25 text-xs mt-8">
          No commitment required. Average demo takes 28 minutes.
        </p>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
function ArrowRight() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function OrbitGraphic({ size = 400 }) {
  const s = size
  return (
    <svg width={s} height={s} viewBox="0 0 400 400" fill="none">
      <circle cx="200" cy="200" r="30" fill="#00C2A8" />
      <ellipse cx="200" cy="200" rx="180" ry="70" fill="none" stroke="#00C2A8" strokeWidth="1.5"
        transform="rotate(-35 200 200)" />
      <ellipse cx="200" cy="200" rx="180" ry="70" fill="none" stroke="#00C2A8" strokeWidth="1.5"
        transform="rotate(35 200 200)" />
      <ellipse cx="200" cy="200" rx="180" ry="70" fill="none" stroke="#00C2A8" strokeWidth="0.5"
        transform="rotate(0 200 200)" />
    </svg>
  )
}

function DashboardMockup() {
  const [ref, visible] = useInView(0.3)

  const bars = [
    { pair: 'EUR/USD', pct: 78 },
    { pair: 'GBP/USD', pct: 52 },
    { pair: 'USD/CAD', pct: 35 },
    { pair: 'USD/JPY', pct: 21 },
  ]

  const stats = [
    { label: 'Total Exposure', val: '$847M', delta: '+2.3%' },
    { label: 'Hedge Ratio', val: '74%', delta: '▲ Target: 80%' },
    { label: 'P&L Impact', val: '-$1.2M', delta: 'MTD' },
  ]

  return (
    <div ref={ref} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 teal-glow">
      {/* Window chrome */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
        <div className="ml-3 flex-1 bg-white/5 rounded px-3 py-1 text-xs text-white/30">
          app.quovaos.com / exposures
        </div>
      </div>

      {/* Exposure summary — fade up with stagger */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        {stats.map((c, i) => (
          <div
            key={c.label}
            className="bg-white/5 rounded-xl p-3 transition-all duration-700"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(12px)',
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <p className="text-white/40 text-[10px] uppercase tracking-wide mb-1">{c.label}</p>
            <p className="text-white font-bold text-lg leading-none mb-1">{c.val}</p>
            <p className="text-orbit-teal text-[10px]">{c.delta}</p>
          </div>
        ))}
      </div>

      {/* Mini chart — bars grow left to right */}
      <div className="bg-white/5 rounded-xl p-4 mb-3">
        <p className="text-white/40 text-[10px] uppercase tracking-wide mb-3">Exposure by Currency Pair</p>
        <div className="space-y-2">
          {bars.map((r, i) => (
            <div key={r.pair} className="flex items-center gap-3">
              <span className="text-white/60 text-[10px] w-14 shrink-0">{r.pair}</span>
              <div className="flex-1 bg-white/10 rounded-full h-1.5">
                <div
                  className="bg-orbit-teal h-1.5 rounded-full"
                  style={{
                    width: visible ? `${r.pct}%` : '0%',
                    transition: `width 1s cubic-bezier(0.22, 1, 0.36, 1) ${450 + i * 200}ms`,
                  }}
                />
              </div>
              <span
                className="text-white/40 text-[10px] w-6 text-right transition-opacity duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transitionDelay: `${900 + i * 200}ms`,
                }}
              >
                {r.pct}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Status row — fades in last */}
      <div
        className="flex items-center gap-2 transition-opacity duration-700"
        style={{ opacity: visible ? 1 : 0, transitionDelay: '1400ms' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-orbit-teal animate-pulse" />
        <span className="text-orbit-teal text-[10px] font-semibold">Live · Last updated 4 seconds ago</span>
        <span className="ml-auto text-white/30 text-[10px]">Audit-ready ✓</span>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   PAGE EXPORT
───────────────────────────────────────────── */
export default function Home() {
  return (
    <>
      <SEO
        path="/"
        description="Quova is the Financial Risk Operating System for enterprises. Replace fragmented, Excel-driven FX workflows with a purpose-built platform for corporate treasury."
        jsonLd={[ORG_SCHEMA, WEBSITE_SCHEMA]}
      />
      <Hero />
      <ProofBar />
      <Problem />
      <WhyNow />
      <ProductOverview />
      <PlatformVision />
      <SocialProof />
      <BuiltForEnterprise />
      <Team />
      <BottomCTA />
    </>
  )
}
