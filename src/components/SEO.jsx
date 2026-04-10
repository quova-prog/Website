import { Helmet } from 'react-helmet-async'

const SITE_URL = 'https://www.quovaos.com'
const DEFAULT_TITLE = 'Quova — The Financial Risk OS'
const DEFAULT_DESC =
  'Quova — The Financial Risk OS for Enterprises. Replace fragmented, Excel-driven FX workflows with a purpose-built operating system.'
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`

export default function SEO({
  title,
  description = DEFAULT_DESC,
  path = '/',
  canonical,
  image = DEFAULT_IMAGE,
  jsonLd,
}) {
  const fullTitle = title ? `${title} | Quova` : DEFAULT_TITLE
  const url = `${SITE_URL}${path}`
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : url

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}

// Pre-built JSON-LD schemas
export const ORG_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Quova',
  url: SITE_URL,
  logo: `${SITE_URL}/quova-icon.png`,
  description:
    'The Financial Risk Operating System for Enterprises. Purpose-built for corporate treasury teams managing FX, interest rate, commodity, and counterparty risk.',
  foundingDate: '2026',
  foundingLocation: { '@type': 'Place', name: 'Toronto, Canada' },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'steve@quovaos.com',
    contactType: 'sales',
  },
  sameAs: [],
}

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Quova',
  url: SITE_URL,
  description: DEFAULT_DESC,
  publisher: { '@type': 'Organization', name: 'Quova' },
}
