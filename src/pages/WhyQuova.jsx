import { Link } from 'react-router-dom'

function PageHeader() {
  return (
    <div className="bg-orbit-navy pt-32 pb-20 hero-grid relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 40% 60%, rgba(0,194,168,0.07) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="section-label text-orbit-teal mb-4">Why Quova</p>
        <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          style={{ letterSpacing: '-0.03em' }}>
          Legacy incumbents.<br />
          <span className="text-orbit-teal">No modern challenger. Until now.</span>
        </h1>
        <p className="text-white/60 text-xl max-w-xl leading-relaxed">
          15+ year-old monoliths with batch-first architecture, or Excel.
          Treasury teams deserve a real-time, AI-native operating system.
        </p>
      </div>
    </div>
  )
}

function LegacyIncumbents() {
  const incumbents = [
    {
      name: 'Legacy FX Platforms',
      age: '15+ years old',
      weaknesses: [
        'Legacy monolith; "Windows 2001" UX',
        'Batch-first — no real-time AI layer',
        'Service deterioration after acquisition',
      ],
    },
    {
      name: 'Bank-Owned Solutions',
      age: 'Acquired by banks',
      weaknesses: [
        'Bank lock-in — trades exclusively via one institution',
        'Lacks independence and execution neutrality',
        'Narrow focus on execution only, not the full workflow',
      ],
    },
    {
      name: 'Large-Cap Specialists',
      age: 'Bootstrapped, aging',
      weaknesses: [
        'Exclusively focused on $40B+ enterprises',
        'No growth investment; aging architecture',
        'Manual data entry; no API breadth',
      ],
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="section-label mb-3">Competitive Landscape</p>
          <h2 className="text-3xl font-bold text-orbit-navy">What the market actually looks like</h2>
          <p className="text-orbit-gray-mid mt-3 leading-relaxed">
            Every incumbent in corporate FX risk management is 15+ years old,
            batch-first, or bank-captive. There is no modern challenger.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {incumbents.map((inc, i) => (
            <div key={i} className="rounded-2xl p-7 border border-gray-100 bg-orbit-gray-light/40">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-orbit-navy">{inc.name}</h3>
                <span className="text-[10px] bg-red-50 text-red-400 font-bold px-2 py-0.5 rounded-full">{inc.age}</span>
              </div>
              <p className="text-xs text-orbit-gray uppercase tracking-widest font-bold mb-3">Strategic Vulnerability</p>
              <ul className="space-y-2">
                {inc.weaknesses.map((w, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-orbit-gray-mid">
                    <span className="text-red-400/60 mt-0.5 shrink-0">✗</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Orbit advantage */}
        <div className="bg-orbit-navy rounded-2xl p-8 border border-orbit-teal/30">
          <div className="flex items-center gap-3 mb-4">
            <span className="bg-orbit-teal text-white text-xs font-bold px-3 py-1 rounded-full">Quova</span>
            <span className="text-white/50 text-xs">Modern · API-First · AI-Native</span>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Real-time streaming', desc: 'Exposure graph updates as ERP transactions post — zero lag' },
              { title: 'Glass Box AI', desc: 'Every recommendation includes audit-ready reasoning. No black boxes.' },
              { title: 'Execution-neutral', desc: 'Best price always. No captive bank relationships.' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-orbit-teal mt-0.5 shrink-0">✓</span>
                <div>
                  <span className="text-white font-semibold text-sm">{a.title}</span>
                  <p className="text-white/50 text-xs mt-1">{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function GlassBoxAI() {
  const comparisons = [
    { legacy: 'Nightly batch uploads', orbit: 'Real-time ingestion as ERP transactions post' },
    { legacy: 'No data lineage', orbit: 'Every exposure traces back to source transaction' },
    { legacy: 'Black box recommendations', orbit: 'Every recommendation includes audit-ready reasoning' },
    { legacy: 'Manual reconciliation (4–5 days/mo)', orbit: 'Continuous sync eliminates manual stitching' },
  ]

  return (
    <section className="py-20 bg-orbit-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="section-label text-orbit-teal mb-3">Technical Moat</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            Why this can't be built with an LLM and an API
          </h2>
          <p className="text-white/60 leading-relaxed">
            In regulated treasury, "Black Box AI" is a liability. Quova is Glass Box AI —
            every decision is traceable, auditable, and explainable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Legacy */}
          <div className="rounded-2xl p-7 bg-white/5 border border-white/10">
            <p className="text-xs font-bold text-red-400 uppercase tracking-widest mb-5">Legacy: Batch Processing</p>
            <ul className="space-y-4">
              {comparisons.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/50">
                  <span className="text-red-400/60 mt-0.5 shrink-0">✗</span>
                  {c.legacy}
                </li>
              ))}
            </ul>
          </div>
          {/* Orbit */}
          <div className="rounded-2xl p-7 bg-orbit-teal/10 border border-orbit-teal/30">
            <p className="text-xs font-bold text-orbit-teal uppercase tracking-widest mb-5">Quova: Streaming Exposure Graph</p>
            <ul className="space-y-4">
              {comparisons.map((c, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-white/80">
                  <span className="text-orbit-teal mt-0.5 shrink-0">✓</span>
                  {c.orbit}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function ROISection() {
  const metrics = [
    { number: '15–22×', label: 'Annual ROI', source: 'Enterprise design partner engagement' },
    { number: '<1 mo', label: 'Payback period', source: 'Enterprise design partner engagement' },
    { number: '90%', label: 'Manual FX effort reduction', source: 'Quova design partner data' },
    { number: '$2.4M', label: 'Annual value delivered', source: '$155K platform cost' },
  ]

  return (
    <section className="py-20 bg-orbit-gray-light/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">ROI Evidence</p>
          <h2 className="text-3xl font-bold text-orbit-navy mb-4">
            The business case isn't modelled. It's measured.
          </h2>
          <p className="text-orbit-gray-mid leading-relaxed">
            These figures come from an IPO-stage enterprise design partnership
            co-developing Quova's product. We present this as a single validated data point,
            not a market average.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {metrics.map((m, i) => (
            <div key={i} className="bg-white rounded-2xl p-7 border border-gray-100 text-center card-hover">
              <div className="text-4xl font-extrabold text-orbit-teal mb-2 leading-none"
                style={{ letterSpacing: '-0.03em' }}>
                {m.number}
              </div>
              <div className="text-sm font-semibold text-orbit-navy mb-1">{m.label}</div>
              <div className="text-xs text-orbit-gray italic">{m.source}</div>
            </div>
          ))}
        </div>

        <div className="callout max-w-3xl">
          <p className="text-sm text-orbit-gray-dark leading-relaxed">
            <strong>The ROI close:</strong> $155K platform cost. $2.4M in annual value. 15–22× ROI.
            Payback in under one month. This engagement is design-partner stage — unpaid
            co-development. The ROI is validated, not contracted.
          </p>
        </div>
      </div>
    </section>
  )
}

function MoatSection() {
  const moat = [
    {
      title: 'Data engineering layer',
      body: 'Intercompany elimination and lineage tracking are unsolved problems in every incumbent product. Quova built the data engineering moat first — this is not a feature LLMs can replicate.',
    },
    {
      title: 'Audit-grade documentation',
      body: 'ASC 815 / IFRS 9 documentation requires transactional integrity from source to report. This cannot be bolted on after the fact, and AI alone cannot substitute for the full workflow.',
    },
    {
      title: 'AI-native architecture',
      body: 'Because Quova owns the data model end-to-end, AI layers have the context they need to be useful. Exposure anomaly detection, hedge strategy suggestions, and natural-language audit queries are all native.',
    },
    {
      title: 'Execution-neutral positioning',
      body: 'Most platforms have bank relationships that create conflicts of interest. Quova is execution-neutral by design — we have no incentive to steer trades, which makes bank co-distribution partnerships possible.',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="section-label mb-3">Defensible Moat</p>
          <h2 className="text-3xl font-bold text-orbit-navy">
            Why this isn't just another dashboard
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {moat.map((m, i) => (
            <div key={i} className="p-7 rounded-2xl border border-gray-100 bg-white card-hover">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-orbit-teal flex items-center justify-center text-white font-bold text-sm shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-orbit-navy mb-2">{m.title}</h3>
                  <p className="text-orbit-gray text-sm leading-relaxed">{m.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyCTA() {
  return (
    <section className="bg-orbit-navy py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          See the ROI for your treasury team
        </h2>
        <p className="text-white/60 mb-8">
          We'll model the ROI case for your specific ERP stack and exposure
          profile in the first demo. No generic slides.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/contact" className="btn-primary px-10 py-4 text-base">
            Book a Demo →
          </Link>
          <Link to="/diagnostic" className="btn-ghost-dark px-10 py-4 text-base">
            Take the FX Diagnostic
          </Link>
        </div>
      </div>
    </section>
  )
}

export default function WhyQuova() {
  return (
    <>
      <PageHeader />
      <LegacyIncumbents />
      <GlassBoxAI />
      <ROISection />
      <MoatSection />
      <WhyCTA />
    </>
  )
}
