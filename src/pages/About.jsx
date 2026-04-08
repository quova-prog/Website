import { Link } from 'react-router-dom'

const FOUNDERS = [
  {
    initials: 'SL',
    name: 'Steve LaBella',
    title: 'CEO & Co-Founder',
    bio: '3 exits including iSend, which scaled to $100M+ revenue, and BillMo and Topaz. Named Forbes Top Tech Innovator. Steve has spent 20+ years building fintech infrastructure at scale — Quova is the problem he kept running into on the other side of the table.',
    email: 'steve@quovaos.com',
  },
  {
    initials: 'MD',
    name: 'Mingze Deng',
    title: 'CPO & Co-Founder',
    bio: 'Architect of Quova\'s platform vision and the technical framework behind the streaming exposure graph. Mingze specialises in data-intensive fintech infrastructure — the kind where lineage, auditability, and real-time correctness are not optional.',
  },
]

const ADVISORS = [
  {
    name: 'Jim McCrindle',
    credential: 'Former Head of Corporate FX, North America — Major Global Bank',
    note: '20+ years institutional FX. Equity-compensated advisor shaping Quova\'s bank distribution strategy.',
  },
  {
    name: 'David Pierce',
    credential: 'FX Markets',
    note: 'FX markets and execution infrastructure expertise.',
  },
  {
    name: 'Daniil Saiko',
    credential: 'Treasury Technology',
    note: 'Deep product knowledge of the incumbent landscape and where the gaps are.',
  },
  {
    name: 'Jeffrey Cooper',
    credential: 'Corporate Treasury & Banking',
    note: 'Corporate treasury and bank partnership expertise.',
  },
  {
    name: 'Shreyans Parekh',
    credential: 'Fruitist',
    note: 'Enterprise operator perspective on treasury pain at scale.',
  },
]

function PageHeader() {
  return (
    <div className="bg-orbit-navy pt-32 pb-20 hero-grid relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(0,194,168,0.07) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="section-label text-orbit-teal mb-4">About</p>
        <h1 className="text-5xl font-black text-white mb-5" style={{ letterSpacing: '-0.03em' }}>
          Built by operators.<br />Backed by the right people.
        </h1>
        <p className="text-white/60 text-xl max-w-2xl">
          Quova was founded in Toronto in 2026 after 50+ interviews with CFOs and
          Treasurers made one thing clear: enterprises need a unified financial risk
          operating system — not another point solution.
        </p>
      </div>
    </div>
  )
}

function Origin() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <p className="section-label mb-4">The Origin</p>
          <h2 className="text-3xl font-bold text-orbit-navy mb-5 leading-tight">
            The problem kept showing up in the same place
          </h2>
          <p className="text-orbit-gray-mid leading-relaxed mb-5">
            FX risk is the #1 financial exposure cited by CFOs globally. And yet in
            interview after interview, the workflow looked the same: a shared Excel
            workbook, a market terminal, and a treasury analyst spending 40+ hours
            a month on data nobody fully trusted.
          </p>
          <p className="text-orbit-gray-mid leading-relaxed mb-5">
            The existing solutions were either
            legacy monoliths, bank-captive, or advisory-led. None of them solved
            the data engineering problem. None of them produced audit-grade
            documentation automatically.
          </p>
          <p className="text-orbit-gray-mid leading-relaxed">
            Quova is the platform that should have existed a decade ago. We built
            it for the $1B–$40B segment that the enterprise vendors ignore and the
            boutique advisors can't scale.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { number: '50+', label: 'CFO and Treasurer interviews before writing a line of code' },
            { number: '$9M+', label: 'Average annual FX loss per firm in our target segment' },
            { number: '2026', label: 'Founded in Toronto, backed by Diagram Ventures' },
            { number: '195', label: 'Hours per month the average treasury team spends on manual FX' },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-5 bg-orbit-gray-light rounded-xl px-6 py-5">
              <div className="text-3xl font-extrabold text-orbit-teal shrink-0"
                style={{ letterSpacing: '-0.03em' }}>
                {s.number}
              </div>
              <div className="text-sm text-orbit-gray-mid leading-snug">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Founders() {
  return (
    <section className="py-20 bg-orbit-gray-light/40">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-3">Founders</p>
        <h2 className="text-3xl font-bold text-orbit-navy mb-12">The team</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {FOUNDERS.map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 card-hover">
              <div className="flex items-start gap-5 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-orbit-teal flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-lg">{f.initials}</span>
                </div>
                <div>
                  <h3 className="font-bold text-orbit-navy text-xl">{f.name}</h3>
                  <p className="text-orbit-teal text-xs font-bold uppercase tracking-widest mt-1">
                    {f.title}
                  </p>
                </div>
              </div>
              <p className="text-orbit-gray-mid text-sm leading-relaxed">{f.bio}</p>
              {f.email && (
                <a href={`mailto:${f.email}`}
                  className="inline-flex items-center gap-2 mt-4 text-orbit-teal text-xs font-semibold hover:underline">
                  {f.email}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Advisors() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="section-label mb-3">Advisory Board</p>
        <h2 className="text-3xl font-bold text-orbit-navy mb-12">
          Shaped by people who've lived the problem
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ADVISORS.map((a, i) => (
            <div key={i} className="bg-orbit-gray-light rounded-xl p-6 card-hover">
              <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center mb-4">
                <span className="text-orbit-navy font-bold text-sm">
                  {a.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="font-bold text-orbit-navy mb-1">{a.name}</h3>
              <p className="text-orbit-teal text-xs font-semibold mb-3">{a.credential}</p>
              <p className="text-orbit-gray text-xs leading-relaxed">{a.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DesignPartners() {
  return (
    <section className="py-20 bg-orbit-navy">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <p className="section-label text-orbit-teal mb-4">Validation</p>
          <h2 className="text-3xl font-bold text-white mb-5">
            Co-built with enterprises who use it
          </h2>
          <p className="text-white/60 leading-relaxed mb-6">
            Quova's design partners are not reference customers — they are
            active co-developers shaping the product through real treasury
            workflows, not focus groups.
          </p>
          <div className="space-y-4">
            <div className="bg-white/5 rounded-xl p-5 border border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-orbit-teal" />
                <span className="text-white font-semibold">IPO-stage enterprise</span>
                <span className="text-white/40 text-xs">Design partner</span>
              </div>
              <p className="text-white/60 text-sm">
                Validated 15–22× annual ROI. $155K platform cost generating $2.4M
                in annual value. Payback under one month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Backers() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="section-label mb-6">Backed By</p>
        <div className="inline-flex items-center gap-4 bg-orbit-gray-light px-8 py-5 rounded-2xl">
          <img src="/quova-icon.png" alt="Quova" className="w-9 h-9" />
          <div className="text-left">
            <div className="font-bold text-orbit-navy">Diagram Ventures</div>
            <div className="text-xs text-orbit-gray">Toronto, Canada</div>
          </div>
        </div>
        <p className="text-orbit-gray text-sm mt-6 max-w-md mx-auto">
          Seed round: $3.0–3.5M · Pre-money: $10–15M ·{' '}
          <Link to="/contact" className="text-orbit-teal hover:underline">
            Investor inquiries welcome
          </Link>
        </p>
      </div>
    </section>
  )
}

export default function About() {
  return (
    <>
      <PageHeader />
      <Origin />
      <Founders />
      <Advisors />
      <DesignPartners />
      <Backers />
    </>
  )
}
