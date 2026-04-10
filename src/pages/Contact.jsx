import { useState } from 'react'
import SEO from '../components/SEO'

const DEMO_CALENDLY_URL = 'https://calendly.com/quovaos/demo' // Replace with live URL
const FORMSPREE_URL = 'https://formspree.io/f/mbdpvlzb'

function PageHeader() {
  return (
    <div className="bg-orbit-navy pt-32 pb-20 hero-grid relative overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at 60% 50%, rgba(0,194,168,0.07) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <p className="section-label text-orbit-teal mb-4">Book a Demo</p>
        <h1 className="text-5xl font-black text-white mb-5" style={{ letterSpacing: '-0.03em' }}>
          See Quova in your environment
        </h1>
        <p className="text-white/60 text-xl max-w-xl">
          30 minutes. We walk through your ERP stack, model your exposure profile,
          and show exactly where Quova fits.
        </p>
      </div>
    </div>
  )
}

function DemoSection() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    name: '', email: '', company: '', revenue: '', erps: '', message: '',
  })

  const update = key => e => setForm(f => ({ ...f, [key]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Request failed')
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please email steve@quovaos.com directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16">

        {/* Left — form */}
        <div>
          <h2 className="text-2xl font-bold text-orbit-navy mb-2">Request a demo</h2>
          <p className="text-orbit-gray-mid text-sm mb-8">
            We'll reach out within one business day to confirm your time.
          </p>

          {submitted ? (
            <div className="bg-orbit-teal-light border-2 border-orbit-teal rounded-2xl p-8 text-center">
              <div className="text-4xl mb-4">✓</div>
              <h3 className="font-bold text-orbit-navy text-xl mb-2">Request received</h3>
              <p className="text-orbit-gray-mid text-sm">
                We'll follow up at <strong>{form.email}</strong> within one business day
                to confirm your demo slot.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-orbit-gray-mid mb-1.5">
                    Full name *
                  </label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="Jane Smith"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-orbit-gray-mid mb-1.5">
                    Work email *
                  </label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="jane@company.com"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-orbit-gray-mid mb-1.5">
                  Company *
                </label>
                <input
                  required
                  type="text"
                  value={form.company}
                  onChange={update('company')}
                  placeholder="Acme Corporation"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-orbit-gray-mid mb-1.5">
                    Annual revenue
                  </label>
                  <select
                    value={form.revenue}
                    onChange={update('revenue')}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal bg-white"
                  >
                    <option value="">Select range</option>
                    <option>$500M – $1B</option>
                    <option>$1B – $5B</option>
                    <option>$5B – $15B</option>
                    <option>$15B – $40B</option>
                    <option>$40B+</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-orbit-gray-mid mb-1.5">
                    Primary ERP
                  </label>
                  <select
                    value={form.erps}
                    onChange={update('erps')}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal bg-white"
                  >
                    <option value="">Select ERP</option>
                    <option>SAP S/4HANA</option>
                    <option>Oracle ERP Cloud</option>
                    <option>NetSuite</option>
                    <option>Multiple / Other</option>
                    <option>Spreadsheets only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-orbit-gray-mid mb-1.5">
                  Anything specific you'd like to cover? (optional)
                </label>
                <textarea
                  value={form.message}
                  onChange={update('message')}
                  rows={3}
                  placeholder="e.g. ASC 815 documentation, multi-ERP aggregation, hedge ratio reporting..."
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-orbit-teal focus:border-transparent resize-none"
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
              >
                {submitting ? 'Sending…' : 'Request Demo →'}
              </button>

              <p className="text-xs text-orbit-gray text-center">
                Prefer to self-schedule?{' '}
                <a
                  href={DEMO_CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orbit-teal hover:underline"
                >
                  Book directly on Calendly →
                </a>
              </p>
            </form>
          )}
        </div>

        {/* Right — what to expect */}
        <div>
          <h2 className="text-2xl font-bold text-orbit-navy mb-8">What to expect</h2>

          <div className="space-y-6 mb-12">
            {[
              {
                n: '01',
                title: 'ERP stack review (5 min)',
                body: 'We map your current ERP configuration and data flow so the demo reflects your actual environment.',
              },
              {
                n: '02',
                title: 'Live exposure graph (10 min)',
                body: 'We show what your consolidated exposure view would look like in Quova — using your currency pairs, entities, and hedging structure.',
              },
              {
                n: '03',
                title: 'Audit documentation walkthrough (10 min)',
                body: 'We demonstrate the ASC 815 / IFRS 9 documentation workflow end-to-end, from hedge designation to audit export.',
              },
              {
                n: '04',
                title: 'ROI model for your firm (5 min)',
                body: 'We model the ROI case against your firm\'s revenue, ERP complexity, and current FX workflow.',
              },
            ].map(s => (
              <div key={s.n} className="flex gap-5">
                <div className="text-orbit-teal font-black text-2xl shrink-0 w-8"
                  style={{ letterSpacing: '-0.04em' }}>
                  {s.n}
                </div>
                <div>
                  <h3 className="font-bold text-orbit-navy mb-1">{s.title}</h3>
                  <p className="text-orbit-gray text-sm leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick stats */}
          <div className="bg-orbit-gray-light rounded-2xl p-6">
            <p className="text-xs font-bold text-orbit-gray uppercase tracking-widest mb-4">
              About the demo
            </p>
            <div className="grid grid-cols-3 gap-4 text-center">
              {[
                { n: '28 min', l: 'average length' },
                { n: '0', l: 'sales pressure' },
                { n: '1 day', l: 'response time' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-orbit-teal mb-1">{s.n}</div>
                  <div className="text-xs text-orbit-gray">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Direct contact */}
          <div className="mt-8 pt-8 border-t border-gray-100">
            <p className="text-sm font-semibold text-orbit-navy mb-1">Direct contact</p>
            <a href="mailto:steve@quovaos.com"
              className="text-orbit-teal text-sm hover:underline">
              steve@quovaos.com
            </a>
            <p className="text-orbit-gray text-xs mt-1">CEO · Steve LaBella · Toronto, Canada</p>
          </div>

          {/* Bank partners note */}
          <div className="callout mt-6">
            <p className="text-sm text-orbit-gray-dark">
              <strong>Bank RMs and corporate banking partners:</strong> reach out directly
              to discuss co-distribution and white-label deployment options.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Contact() {
  return (
    <>
      <SEO
        title="Book a Demo"
        path="/contact"
        description="See Quova in your environment. Book a 30-minute demo — we'll map your ERP stack, model your exposure profile, and show exactly where Quova fits."
      />
      <PageHeader />
      <DemoSection />
    </>
  )
}
