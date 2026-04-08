import { useState } from 'react'
import benchmarks from '../data/benchmarks.json'

// ── Calculation helpers ──────────────────────────────────────

const REVENUE_MIDPOINTS = {
  '<$500M':      250_000_000,
  '$500M–$1B':   750_000_000,
  '$1B–$2.5B': 1_750_000_000,
  '$2.5B–$5B': 3_750_000_000,
  '$5B–$10B':  7_500_000_000,
  '$10B+':    12_500_000_000,
}

const HEDGE_RATIO_MIDPOINTS = {
  '0% — we don\'t hedge': 0.00,
  'Less than 25%':        0.125,
  '25–50%':               0.375,
  '50–75%':               0.625,
  '75–90%':               0.825,
  '90%+':                 0.95,
}

function calculate({ revenue_band, international_pct, currencies, currency_exposures, hedge_ratio, industry }) {
  const vol = benchmarks.volatility
  let gross_exposure, avg_volatility, top_currencies

  const filledEntries = Object.entries(currency_exposures ?? {}).filter(([, amt]) => amt > 0)

  if (filledEntries.length > 0) {
    gross_exposure = filledEntries.reduce((s, [, amt]) => s + amt, 0)
    avg_volatility = filledEntries.reduce(
      (s, [ccy, amt]) => s + (vol[ccy] ?? vol['Other']) * (amt / gross_exposure), 0,
    )
    top_currencies = [...filledEntries].sort(([, a], [, b]) => b - a).slice(0, 2).map(([ccy]) => ccy)
  } else {
    const revenue  = REVENUE_MIDPOINTS[revenue_band] ?? 1_750_000_000
    gross_exposure = revenue * (international_pct / 100)
    const ccys     = currencies.length > 0 ? currencies : ['Other']
    const weights  = ccys.map(c => vol[c] ?? vol['Other'])
    avg_volatility = weights.reduce((s, w) => s + w, 0) / weights.length
    top_currencies = [...ccys].sort((a, b) => (vol[b] ?? 0.10) - (vol[a] ?? 0.10)).slice(0, 2)
  }

  const hedge_midpoint    = HEDGE_RATIO_MIDPOINTS[hedge_ratio] ?? 0.625
  const unhedged_exposure = gross_exposure * (1 - hedge_midpoint)
  const ind               = industry ?? 'Other'
  const benchmark_eff     = benchmarks.efficiency_gap[ind] ?? benchmarks.efficiency_gap['Other']
  const efficiency_gap    = benchmark_eff - 0.50
  const leakage_point     = unhedged_exposure * avg_volatility * efficiency_gap
  const leakage_low       = leakage_point * 0.75
  const leakage_high      = leakage_point * 1.25
  const pnl_1pct          = gross_exposure * 0.01
  const bench_range       = benchmarks.efficiency_ranges[ind] ?? benchmarks.efficiency_ranges['Other']

  return { leakage_low, leakage_high, gross_exposure, top_currencies,
    hedge_ratio_label: hedge_ratio ?? '50–75%', pnl_1pct,
    benchmark_low: bench_range.low, benchmark_high: bench_range.high, industry: ind }
}

function formatMoney(n) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000)     return `$${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000)         return `$${(n / 1_000).toFixed(0)}K`
  return `$${Math.round(n).toLocaleString()}`
}

// ── Constants ────────────────────────────────────────────────

const QUESTIONS = [
  { key: 'revenue_band',       text: "What is your company's annual revenue?",                      hint: 'Select the band that best reflects your most recent full fiscal year.' },
  { key: 'international_pct',  text: 'What percentage of revenue comes from international markets?', hint: 'Include revenue from any country other than your headquarters location.' },
  { key: 'currencies',         text: 'Which currencies does your company have exposure to?',         hint: 'Select all that apply — currencies you regularly receive or pay in.' },
  { key: 'currency_exposures', text: 'What is your approximate annual exposure in each currency?',   hint: 'Enter USD equivalent totals. Approximate figures are fine — we use ranges, not exact values.' },
  { key: 'hedge_ratio',        text: 'What is your approximate current hedge ratio?',                hint: 'The proportion of your FX exposure currently covered by hedging instruments.' },
  { key: 'industry',           text: 'What industry are you in?',                                    hint: 'We use this to benchmark your program against sector peers.' },
]

const REVENUE_BANDS  = ['<$500M', '$500M–$1B', '$1B–$2.5B', '$2.5B–$5B', '$5B–$10B', '$10B+']
const CURRENCIES     = ['EUR','GBP','JPY','CAD','AUD','CHF','CNY','HKD','SGD','INR','KRW','MXN','BRL','Other']
const CURRENCY_NAMES = {
  EUR:'Euro', GBP:'Pound Sterling', JPY:'Japanese Yen', CAD:'Canadian Dollar',
  AUD:'Australian Dollar', CHF:'Swiss Franc', CNY:'Chinese Yuan', HKD:'Hong Kong Dollar',
  SGD:'Singapore Dollar', INR:'Indian Rupee', KRW:'South Korean Won', MXN:'Mexican Peso',
  BRL:'Brazilian Real', Other:'Other currencies',
}
const HEDGE_RATIOS = ["0% — we don't hedge",'Less than 25%','25–50%','50–75%','75–90%','90%+']
const INDUSTRIES   = ['Manufacturing','Technology','Healthcare & Life Sciences','Consumer Goods & Retail','Energy & Resources','Financial Services','Other']

const INITIAL_ANSWERS = {
  revenue_band: null, international_pct: 25, currencies: [],
  currency_exposures: {}, hedge_ratio: null, industry: null,
}

// ── Shared UI ────────────────────────────────────────────────

const TEAL = '#00C2A8'
const BG   = '#0A0F1E'
const CARD = '#0F1629'

function OptionCard({ label, selected, onClick }) {
  return (
    <button onClick={onClick}
      className="w-full text-left px-5 py-4 rounded-xl border font-medium text-base transition-all duration-150 active:scale-[0.98]"
      style={{
        background:  selected ? 'rgba(0,194,168,0.1)' : CARD,
        borderColor: selected ? TEAL : 'rgba(255,255,255,0.1)',
        color:       selected ? TEAL : '#ffffff',
      }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = 'rgba(0,194,168,0.4)' }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
    >
      {label}
    </button>
  )
}

function ContinueBtn({ onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className="w-full py-4 rounded-xl font-bold text-base transition-all duration-150 active:scale-[0.98]"
      style={{
        background: disabled ? 'rgba(255,255,255,0.08)' : TEAL,
        color:      disabled ? 'rgba(255,255,255,0.3)'  : BG,
        cursor:     disabled ? 'not-allowed' : 'pointer',
      }}
    >
      Continue →
    </button>
  )
}

function ProgressBar({ step }) {
  const pct = ((step + 1) / 6) * 100
  return (
    <div className="w-full h-1" style={{ background: 'rgba(255,255,255,0.1)' }}>
      <div className="h-full transition-all duration-500 ease-out" style={{ width: `${pct}%`, background: TEAL }} />
    </div>
  )
}

function Divider() {
  return <div className="w-full my-8" style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
}

// ── Intro Screen ─────────────────────────────────────────────

function IntroScreen({ onStart }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-6 pt-28 pb-12" style={{ background: BG }}>
      <div />
      <div className="text-center max-w-md w-full">
        <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight mb-5">
          How much FX value is your program leaving on the table?
        </h1>
        <p className="text-lg mb-10" style={{ color: '#94A3B8' }}>
          Answer 6 questions. Get your number in under 2 minutes.{' '}
          <span className="text-white font-medium">No login required.</span>
        </p>
        <button onClick={onStart}
          className="w-full sm:w-auto px-10 py-4 font-bold text-lg rounded-xl transition-all duration-150 active:scale-95"
          style={{ background: TEAL, color: BG, boxShadow: '0 8px 32px rgba(0,194,168,0.25)' }}
          onMouseEnter={e => (e.currentTarget.style.background = '#00D4B8')}
          onMouseLeave={e => (e.currentTarget.style.background = TEAL)}
        >
          Start the Diagnostic →
        </button>
      </div>
      <p className="text-xs" style={{ color: '#475569' }}>Powered by Quova · For corporate treasury teams</p>
    </div>
  )
}

// ── Question Step ────────────────────────────────────────────

function QuestionStep({ step, answers, onSelectAndAdvance, onChange, onContinue }) {
  const q = QUESTIONS[step]
  const sliderPct = answers.international_pct
  const sliderStyle = {
    background: `linear-gradient(to right, ${TEAL} 0%, ${TEAL} ${sliderPct}%, rgba(255,255,255,0.12) ${sliderPct}%, rgba(255,255,255,0.12) 100%)`,
  }
  const exposures    = answers.currency_exposures ?? {}
  const totalExposed = Object.values(exposures).reduce((s, v) => s + (v || 0), 0)

  function updateExposure(ccy, raw) {
    const val = parseFloat(raw) || 0
    onChange('currency_exposures', { ...exposures, [ccy]: val })
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: BG }}>
      <div className="pt-16"><ProgressBar step={step} /></div>
      <div className="flex-1 px-5 pt-8 pb-12 max-w-lg mx-auto w-full">
        <p className="text-sm font-semibold tracking-widest uppercase mb-3" style={{ color: TEAL }}>
          Question {step + 1} of 6
        </p>
        <h2 className="text-2xl sm:text-3xl font-black text-white leading-snug mb-2">{q.text}</h2>
        <p className="text-sm mb-8" style={{ color: '#64748B' }}>{q.hint}</p>

        {/* Q1: Revenue band */}
        {step === 0 && (
          <div className="flex flex-col gap-3">
            {REVENUE_BANDS.map(band => (
              <OptionCard key={band} label={band} selected={answers.revenue_band === band}
                onClick={() => onSelectAndAdvance('revenue_band', band)} />
            ))}
          </div>
        )}

        {/* Q2: International % slider */}
        {step === 1 && (
          <div>
            <div className="text-center mb-8">
              <span className="text-7xl font-black" style={{ color: TEAL }}>{answers.international_pct}%</span>
              <p className="text-sm mt-3" style={{ color: '#64748B' }}>of revenue from international markets</p>
            </div>
            <input type="range" min="0" max="100" step="5" value={answers.international_pct}
              onChange={e => onChange('international_pct', parseInt(e.target.value))}
              style={sliderStyle} className="w-full mb-2 diagnostic-slider" />
            <div className="flex justify-between text-xs mb-10" style={{ color: '#475569' }}>
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
            <ContinueBtn onClick={onContinue} />
          </div>
        )}

        {/* Q3: Currency multi-select */}
        {step === 2 && (
          <div>
            <div className="flex flex-wrap gap-3 mb-8">
              {CURRENCIES.map(ccy => {
                const selected = answers.currencies.includes(ccy)
                return (
                  <button key={ccy}
                    onClick={() => {
                      const next = selected ? answers.currencies.filter(c => c !== ccy) : [...answers.currencies, ccy]
                      if (selected) { const nextExp = { ...exposures }; delete nextExp[ccy]; onChange('currency_exposures', nextExp) }
                      onChange('currencies', next)
                    }}
                    className="flex flex-col items-center px-4 py-3 rounded-xl border transition-all duration-150 active:scale-95"
                    style={{
                      background: selected ? 'rgba(0,194,168,0.12)' : CARD,
                      borderColor: selected ? TEAL : 'rgba(255,255,255,0.1)',
                      minWidth: 90,
                    }}
                  >
                    <span className="font-bold text-sm" style={{ color: selected ? TEAL : '#ffffff' }}>{ccy}</span>
                    <span className="text-xs mt-0.5" style={{ color: selected ? 'rgba(0,194,168,0.7)' : 'rgba(255,255,255,0.35)' }}>
                      {CURRENCY_NAMES[ccy]}
                    </span>
                  </button>
                )
              })}
            </div>
            {answers.currencies.length === 0 && (
              <p className="text-xs mb-4" style={{ color: '#475569' }}>Select at least one currency to continue.</p>
            )}
            <ContinueBtn onClick={onContinue} disabled={answers.currencies.length === 0} />
          </div>
        )}

        {/* Q4: Exposure amount per currency */}
        {step === 3 && (
          <div>
            <div className="flex flex-col gap-4 mb-6">
              {answers.currencies.map(ccy => {
                const val = exposures[ccy]
                const hasVal = val > 0
                return (
                  <div key={ccy}>
                    <label className="flex items-center gap-3 text-sm font-semibold mb-1.5" style={{ color: '#CBD5E1' }}>
                      <span className="inline-flex items-center justify-center rounded-lg px-2.5 py-1 text-xs font-bold"
                        style={{ background: 'rgba(0,194,168,0.15)', color: TEAL, minWidth: 44 }}>{ccy}</span>
                      Annual exposure
                      {hasVal && <span className="ml-auto font-mono text-xs" style={{ color: TEAL }}>≈ {formatMoney(val)}</span>}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-sm select-none" style={{ color: '#475569' }}>$</span>
                      <input type="number" min="0" step="100000" placeholder="0" value={val || ''}
                        onChange={e => updateExposure(ccy, e.target.value)}
                        className="w-full pl-8 pr-4 py-3.5 rounded-xl text-white text-sm font-mono outline-none transition-colors"
                        style={{ background: CARD, border: `1px solid ${hasVal ? 'rgba(0,194,168,0.4)' : 'rgba(255,255,255,0.1)'}` }}
                        onFocus={e => (e.target.style.borderColor = TEAL)}
                        onBlur={e => (e.target.style.borderColor = hasVal ? 'rgba(0,194,168,0.4)' : 'rgba(255,255,255,0.1)')}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
            {totalExposed > 0 && (
              <div className="flex justify-between items-center px-4 py-3 rounded-xl mb-6 text-sm"
                style={{ background: 'rgba(0,194,168,0.07)', border: '1px solid rgba(0,194,168,0.15)' }}>
                <span style={{ color: '#64748B' }}>Total FX exposure entered</span>
                <span className="font-black font-mono" style={{ color: TEAL }}>{formatMoney(totalExposed)}</span>
              </div>
            )}
            {totalExposed === 0 && (
              <p className="text-xs mb-4" style={{ color: '#475569' }}>Enter a value for each currency. Enter 0 if you're unsure.</p>
            )}
            <ContinueBtn onClick={onContinue} disabled={totalExposed === 0} />
          </div>
        )}

        {/* Q5: Hedge ratio */}
        {step === 4 && (
          <div className="flex flex-col gap-3">
            {HEDGE_RATIOS.map(ratio => (
              <OptionCard key={ratio} label={ratio} selected={answers.hedge_ratio === ratio}
                onClick={() => onSelectAndAdvance('hedge_ratio', ratio)} />
            ))}
          </div>
        )}

        {/* Q6: Industry */}
        {step === 5 && (
          <div className="flex flex-col gap-3">
            {INDUSTRIES.map(ind => (
              <OptionCard key={ind} label={ind} selected={answers.industry === ind}
                onClick={() => onSelectAndAdvance('industry', ind)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Results Screen ───────────────────────────────────────────

function ResultsScreen({ results, answers }) {
  const [email, setEmail]         = useState('')
  const [submitted, setSubmitted] = useState(false)

  const { leakage_low, leakage_high, top_currencies, pnl_1pct, benchmark_low, benchmark_high, industry, hedge_ratio_label } = results

  const currencyText = top_currencies.length >= 2 ? `${top_currencies[0]} and ${top_currencies[1]}` : top_currencies[0] ?? 'your key currency pairs'
  const hedgeLabel   = (hedge_ratio_label ?? '50–75%').toLowerCase()
  const driverText   = `Your primary exposure is in ${currencyText}. At your current hedge ratio of approximately ${hedgeLabel}, a 1% adverse move in your key pairs represents approximately ${formatMoney(pnl_1pct)} in P&L impact.`
  const benchmarkText = `Companies of your size in ${industry} typically run FX programs at ${benchmark_low}–${benchmark_high}% efficiency. Based on your inputs, your program is estimated at approximately 50% efficiency — leaving a meaningful gap.`

  function handleSubmitEmail(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen pb-16 w-full" style={{ background: BG }}>
      <div className="px-5 pt-28 max-w-lg mx-auto w-full">
        {/* Leakage number */}
        <div className="text-center mb-2">
          <p className="text-xs font-semibold tracking-widest uppercase mb-5" style={{ color: '#64748B' }}>
            Estimated Annual FX Value Leakage
          </p>
          <div className="font-black leading-none diagnostic-teal-glow"
            style={{ color: TEAL, fontSize: 'clamp(2.5rem, 10vw, 4.5rem)', letterSpacing: '-0.02em' }}>
            {formatMoney(leakage_low)} – {formatMoney(leakage_high)}
          </div>
          <p className="text-sm mt-5 max-w-xs mx-auto" style={{ color: '#64748B' }}>
            Based on your revenue, international exposure, currency mix, and current hedge ratio.
          </p>
        </div>

        <Divider />

        {/* What's driving it */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#94A3B8' }}>What's driving it</h3>
          <p className="text-base leading-relaxed" style={{ color: '#CBD5E1' }}>{driverText}</p>
        </div>

        <Divider />

        {/* How you compare */}
        <div>
          <h3 className="text-xs font-semibold tracking-widest uppercase mb-3" style={{ color: '#94A3B8' }}>How you compare</h3>
          <p className="text-base leading-relaxed mb-6" style={{ color: '#CBD5E1' }}>{benchmarkText}</p>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: '#64748B' }}>Your estimated program</span>
                <span className="font-semibold text-white">~50%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: '50%', background: '#F59E0B' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1.5">
                <span style={{ color: '#64748B' }}>Industry leaders ({industry})</span>
                <span className="font-semibold" style={{ color: TEAL }}>{benchmark_low}–{benchmark_high}%</span>
              </div>
              <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
                <div className="h-full rounded-full transition-all duration-700" style={{ width: `${benchmark_high}%`, background: TEAL }} />
              </div>
            </div>
          </div>
        </div>

        <Divider />

        {/* Email capture */}
        {!submitted ? (
          <div className="mb-8">
            <h3 className="text-white font-semibold text-sm tracking-widest uppercase mb-1">Email this report</h3>
            <p className="text-sm mb-4" style={{ color: '#64748B' }}>Send to yourself or your CFO — no account required.</p>
            <form onSubmit={handleSubmitEmail} className="flex flex-col sm:flex-row gap-3">
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" required
                className="flex-1 px-4 py-3 rounded-xl text-sm text-white placeholder-slate-500 outline-none transition-colors"
                style={{ background: CARD, border: '1px solid rgba(255,255,255,0.1)' }}
                onFocus={e => (e.target.style.borderColor = TEAL)}
                onBlur={e => (e.target.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button type="submit"
                className="px-6 py-3 rounded-xl font-bold text-sm transition-all duration-150 whitespace-nowrap active:scale-95"
                style={{ background: TEAL, color: BG }}>
                Send Report
              </button>
            </form>
          </div>
        ) : (
          <div className="mb-8 p-5 rounded-xl text-center"
            style={{ background: 'rgba(0,194,168,0.08)', border: '1px solid rgba(0,194,168,0.25)' }}>
            <span className="font-semibold" style={{ color: TEAL }}>✓ Saved.</span>
            <span className="text-sm ml-2" style={{ color: '#CBD5E1' }}>A Quova team member will follow up shortly.</span>
          </div>
        )}

        <Divider />

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-xl font-black text-white mb-3">Want to see your precise number?</h3>
          <p className="text-sm mb-7 max-w-xs mx-auto" style={{ color: '#64748B' }}>
            Connect your actual ERP data and Quova will show you exactly where your FX program is losing value — and how to close the gap.
          </p>
          <a href="/contact"
            className="inline-block px-8 py-4 rounded-xl font-bold text-base transition-all duration-150 active:scale-95"
            style={{ background: TEAL, color: BG, boxShadow: '0 8px 32px rgba(0,194,168,0.2)' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#00D4B8')}
            onMouseLeave={e => (e.currentTarget.style.background = TEAL)}
          >
            Book a 20-Minute Call →
          </a>
        </div>

        <p className="text-center text-xs mt-12" style={{ color: '#334155' }}>
          Powered by Quova · For corporate treasury teams
        </p>
      </div>
    </div>
  )
}

// ── Main Component ───────────────────────────────────────────

export default function FXDiagnostic() {
  const [screen,  setScreen]  = useState('intro')
  const [step,    setStep]    = useState(0)
  const [answers, setAnswers] = useState(INITIAL_ANSWERS)
  const [results, setResults] = useState(null)

  function handleStart() {
    setAnswers(INITIAL_ANSWERS)
    setStep(0)
    setScreen('questions')
  }

  function handleSelectAndAdvance(key, value) {
    const next = { ...answers, [key]: value }
    setAnswers(next)
    advanceOrFinish(next)
  }

  function handleContinue() {
    advanceOrFinish(answers)
  }

  function handleChange(key, value) {
    setAnswers(prev => ({ ...prev, [key]: value }))
  }

  function advanceOrFinish(currentAnswers) {
    if (step < 5) {
      setStep(s => s + 1)
    } else {
      const r = calculate(currentAnswers)
      setResults(r)
      setScreen('results')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      {screen === 'intro' && <IntroScreen onStart={handleStart} />}
      {screen === 'questions' && (
        <QuestionStep key={step} step={step} answers={answers}
          onSelectAndAdvance={handleSelectAndAdvance} onChange={handleChange} onContinue={handleContinue} />
      )}
      {screen === 'results' && results && <ResultsScreen results={results} answers={answers} />}
    </>
  )
}
