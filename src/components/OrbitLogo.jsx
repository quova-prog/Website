/**
 * OrbitLogo — interlocking-orbit mark + "ORBIT" wordmark.
 *
 * Renders the canonical Orbit identity in teal (#00C2A8).
 * Default size assumes navbar use; pass `size` for other surfaces.
 *
 * Variants:
 *   <OrbitLogo />              full lockup (mark + wordmark)
 *   <OrbitLogo iconOnly />     mark only (favicon, mobile, password splash)
 *
 * Props:
 *   size       number    height in px (default: 32)
 *   iconOnly   boolean   render mark only, no wordmark (default: false)
 *   className  string    extra classes for the outer wrapper
 */
export default function OrbitLogo({ size = 32, iconOnly = false, className = '' }) {
  const teal = '#00C2A8'

  const Mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      {/* outer orbit ring */}
      <circle cx="16" cy="16" r="11" stroke={teal} strokeWidth="2.6" />
      {/* core / center body */}
      <circle cx="16" cy="16" r="3.2" fill={teal} />
    </svg>
  )

  if (iconOnly) {
    return (
      <span
        className={`inline-flex items-center ${className}`}
        aria-label="Orbit"
      >
        {Mark}
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-2 ${className}`}
      aria-label="Orbit"
    >
      {Mark}
      <span
        className="font-extrabold tracking-wide"
        style={{
          color: teal,
          fontSize: size * 0.7,
          lineHeight: 1,
          letterSpacing: '0.06em',
        }}
      >
        ORBIT
      </span>
    </span>
  )
}
