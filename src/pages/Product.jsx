import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

const CAPABILITIES = [
  {
    tag: 'Data Layer',
    title: 'Multi-ERP Exposure Aggregation',
    body: `Quova connects to SAP, Oracle, NetSuite, and custom ERP instances simultaneously. 
    Our data engineering layer handles intercompany elimination, entity consolidation, 
    and lineage tracking — so you always know not just what the exposure is, 
    but where it came from and how it was calculated.`,
    bullets: [
      'SAP S/4HANA, Oracle ERP Cloud, NetSuite native connectors',
      'Intercompany elimination and consolidated entity view',
      'Full data lineage from source transaction to hedged position',
      'Real-time streaming — no batch jobs, no stale data',
    ],
    accent: true,
  },
  {
    tag: 'Analytics',
    title: 'Streaming Exposure Graph',
    body: `A live, drill-down exposure view across every currency pair, entity, and 
    maturity bucket. Filter by ERP, subsidiary, trade type, or counterparty. 
    No manual reconciliation. No spreadsheet pivots. The graph updates in real time 
    as transactions flow through your ERPs.`,
    bullets: [
      'Live exposure by currency pair, entity, and maturity',
      'Drill-down from consolidated to transaction level',
      'Rolling 12-month forward curve overlay',
      'Gap analysis vs. target hedge ratio with alert thresholds',
    ],
  },
  {
    tag: 'Compliance',
    title: 'Audit-Ready Hedge Accounting',
    body: `ASC 815 (US GAAP) and IFRS 9 documentation that is generated automatically 
    as you hedge — not assembled after the fact. Effectiveness testing, hedge 
    designations, prospective and retrospective assessments, and the full 
    audit trail in one exportable file.`,
    bullets: [
      'ASC 815 and IFRS 9 designation documentation',
      'Automated effectiveness testing (prospective + retrospective)',
      'Audit-export package: one click, complete documentation',
      '10%+ fewer exposure mismatches vs. manual process',
    ],
    accent: true,
  },
  {
    tag: 'Execution',
    title: 'Execution-Neutral Trade Infrastructure',
    body: `Trade with any bank, any counterparty. Quova is not captive — 
    we do not require you to route trades through a specific institution. 
    Full trade lifecycle support from pre-trade analytics through confirmation, 
    settlement, and post-trade reconciliation.`,
    bullets: [
      'Route trades to any bank or ECN — no captive relationships',
      'Pre-trade analytics: fair value, basis risk, bid/ask assessment',
      'Automated confirmation and settlement reconciliation',
      'SWIFT MT300/MT304 generation supported',
    ],
  },
]

function PageHeader() {
  return (
    <div className="bg-orbit-navy pt-32 pb-20 hero-grid relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(0,194,168,0.07) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="section-label text-orbit-teal mb-4">Platform</p>
        <h1 className="text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
          style={{ letterSpacing: '-0.03em' }}>
          The Financial Risk<br />Operating System
        </h1>
        <p className="text-white/60 text-xl max-w-xl leading-relaxed">
          Trade execution is &lt;5% of the FX workflow. Quova automates the other 95%.
          Four integrated modules. One live data model. Glass Box AI. Audit-ready by design.
        </p>
      </div>
    </div>
  )
}

function CapabilitySection({ cap, index }) {
  const isEven = index % 2 === 0
  return (
    <section className={`py-20 ${cap.accent ? 'bg-orbit-gray-light/40' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div className={isEven ? '' : 'lg:order-2'}>
          <span className="inline-block bg-orbit-teal-light text-orbit-teal-dark text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-5">
            {cap.tag}
          </span>
          <h2 className="text-3xl font-bold text-orbit-navy mb-5 leading-tight">{cap.title}</h2>
          <p className="text-orbit-gray-mid leading-relaxed mb-8">{cap.body}</p>
          <ul className="space-y-3">
            {cap.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-orbit-gray-mid">
                <span className="mt-0.5 w-4 h-4 rounded-full bg-orbit-teal-light border border-orbit-teal flex items-center justify-center shrink-0">
                  <span className="text-orbit-teal text-[10px]">✓</span>
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>
        <div className={`${isEven ? '' : 'lg:order-1'}`}>
          <CapabilityVisual tag={cap.tag} />
        </div>
      </div>
    </section>
  )
}

function CapabilityVisual({ tag }) {
  const visuals = {
    'Data Layer': (
      <div className="bg-orbit-navy rounded-2xl p-6 border border-white/10">
        <p className="text-xs text-orbit-teal font-bold uppercase tracking-widest mb-4">ERP Connections</p>
        {['SAP S/4HANA', 'Oracle ERP Cloud', 'NetSuite', 'Custom ERP'].map((erp, i) => (
          <div key={erp} className="flex items-center gap-3 mb-3 last:mb-0">
            <div className="w-8 h-8 rounded-lg bg-orbit-teal/10 border border-orbit-teal/30 flex items-center justify-center">
              <span className="text-orbit-teal text-xs font-bold">{erp[0]}</span>
            </div>
            <div className="flex-1">
              <div className="text-white text-sm font-medium">{erp}</div>
              <div className="text-white/30 text-xs">Connected · Live</div>
            </div>
            <div className="w-2 h-2 rounded-full bg-orbit-teal animate-pulse" />
          </div>
        ))}
        <div className="mt-5 pt-5 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs text-white/50">
            <span className="text-orbit-teal">→</span>
            <span>Consolidated exposure model · Intercompany eliminated</span>
          </div>
        </div>
      </div>
    ),
    'Analytics': (
      <div className="bg-orbit-navy rounded-2xl p-6 border border-white/10">
        <p className="text-xs text-orbit-teal font-bold uppercase tracking-widest mb-4">Live Exposure</p>
        <div className="space-y-3">
          {[
            { pair: 'EUR/USD', exp: '$312M', hedge: 82 },
            { pair: 'GBP/USD', exp: '$187M', hedge: 74 },
            { pair: 'USD/CAD', exp: '$144M', hedge: 61 },
            { pair: 'USD/JPY', exp: '$98M', hedge: 45 },
          ].map(r => (
            <div key={r.pair} className="bg-white/5 rounded-lg p-3">
              <div className="flex justify-between text-xs mb-2">
                <span className="text-white font-semibold">{r.pair}</span>
                <span className="text-white/60">{r.exp}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-white/10 rounded-full h-1.5">
                  <div className="bg-orbit-teal h-1.5 rounded-full" style={{ width: `${r.hedge}%` }} />
                </div>
                <span className="text-orbit-teal text-[10px] font-bold">{r.hedge}% hedged</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    'Compliance': (
      <div className="bg-orbit-navy rounded-2xl p-6 border border-white/10">
        <p className="text-xs text-orbit-teal font-bold uppercase tracking-widest mb-4">Audit Package</p>
        {[
          { doc: 'Hedge Designation Form', status: 'Complete', ok: true },
          { doc: 'Prospective Effectiveness Test', status: 'Complete', ok: true },
          { doc: 'Retrospective Test (Q4)', status: 'Complete', ok: true },
          { doc: 'Fair Value Disclosure', status: 'Generated', ok: true },
        ].map(d => (
          <div key={d.doc} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
            <span className="text-white/80 text-sm">{d.doc}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              d.ok ? 'bg-orbit-teal/10 text-orbit-teal' : 'bg-red-500/10 text-red-400'
            }`}>{d.status}</span>
          </div>
        ))}
        <button className="mt-4 w-full bg-orbit-teal/10 border border-orbit-teal/30 text-orbit-teal text-xs font-semibold py-2 rounded-lg hover:bg-orbit-teal/20 transition-colors">
          Export Full Audit Package →
        </button>
      </div>
    ),
    'Execution': (
      <div className="bg-orbit-navy rounded-2xl p-6 border border-white/10">
        <p className="text-xs text-orbit-teal font-bold uppercase tracking-widest mb-4">Trade Routing</p>
        {['Your Primary Bank', 'Secondary Counterparty', 'ECN / Platform', 'Any Other Bank'].map(bank => (
          <div key={bank} className="flex items-center justify-between py-2.5 border-b border-white/5 last:border-0">
            <span className="text-white/80 text-sm">{bank}</span>
            <span className="text-xs text-white/40 bg-white/5 px-2 py-0.5 rounded">Available</span>
          </div>
        ))}
        <div className="mt-4 callout bg-orbit-teal/5 border-orbit-teal/30">
          <p className="text-orbit-teal text-xs">
            Execution-neutral — Quova never restricts which institution you trade with.
          </p>
        </div>
      </div>
    ),
  }
  return visuals[tag] || null
}

function PlatformRoadmap() {
  const coreModules = [
    'Data Ingestion Engine',
    'Exposure Graph',
    'Policy Engine',
    'Hedge Accounting Automation',
    'Audit Trail',
    'Reporting Framework',
  ]

  const riskModules = [
    { name: 'FX Risk', timeline: 'Building Now', desc: 'Currency exposure, forward contracts, options, swaps', active: true },
    { name: 'Interest Rate', timeline: 'Coming Soon', desc: 'Floating-rate debt, IR swaps, caps, floors, swaptions', active: false },
    { name: 'Commodities', timeline: 'Coming Soon', desc: 'Raw materials, commodity forwards, futures, options', active: false },
    { name: 'Counterparty', timeline: 'Coming Soon', desc: 'Bank limits, ISDA exposure, credit risk', active: false },
  ]

  return (
    <section className="py-20 bg-orbit-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="section-label text-orbit-teal mb-3">Platform Architecture</p>
          <h2 className="text-3xl font-bold text-white mb-4">
            One architecture. Every financial risk.
          </h2>
          <p className="text-white/60 leading-relaxed">
            The platform layer is risk-type agnostic — built once, deployed across every module.
            Same buyer, same budget, same compliance framework, same data integrations.
          </p>
        </div>

        {/* Core modules */}
        <div className="mb-8">
          <p className="text-xs text-orbit-teal font-bold uppercase tracking-widest mb-4">Platform Core</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {coreModules.map(m => (
              <div key={m} className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-center">
                <span className="text-white/80 text-xs font-medium">{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Risk modules */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {riskModules.map((m, i) => (
            <div key={i} className={`rounded-2xl p-6 border ${
              m.active ? 'bg-orbit-teal/10 border-orbit-teal/30' : 'bg-white/5 border-white/10'
            }`}>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${
                m.active ? 'bg-orbit-teal text-white' : 'bg-white/10 text-white/50'
              }`}>
                {m.timeline}
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

function ProductCTA() {
  return (
    <section className="bg-orbit-navy py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">See it in your environment</h2>
        <p className="text-white/60 mb-8">
          A 30-minute demo walks through how Quova connects to your ERP stack,
          what your exposure graph looks like on day one, and the ROI case for
          your treasury team.
        </p>
        <Link to="/contact" className="btn-primary px-10 py-4 text-base">
          Book a Demo →
        </Link>
      </div>
    </section>
  )
}

export default function Product() {
  return (
    <>
      <SEO
        title="Platform"
        path="/product"
        description="Quova's platform: multi-ERP exposure aggregation, streaming exposure graph, automated hedge accounting (ASC 815 / IFRS 9), and bank-neutral execution — all in one system."
      />
      <PageHeader />
      {CAPABILITIES.map((cap, i) => (
        <CapabilitySection key={cap.tag} cap={cap} index={i} />
      ))}
      <PlatformRoadmap />
      <ProductCTA />
    </>
  )
}
