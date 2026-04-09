// Vercel Serverless Function — receives demo-request form submissions
// and emails them to steve@quovaos.com via Resend.
//
// Required env var in Vercel dashboard:
//   RESEND_API_KEY  — get one free at https://resend.com

export default async function handler(req, res) {
  // Only accept POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, company, revenue, erps, message } = req.body || {}

  // Basic validation
  if (!name || !email || !company) {
    return res.status(400).json({ error: 'Name, email, and company are required.' })
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (!RESEND_API_KEY) {
    console.error('Missing RESEND_API_KEY env var')
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  // Build a clean HTML email body
  const html = `
    <h2>New Demo Request from quovaos.com</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td style="padding:6px 12px;font-weight:bold;">Name</td><td style="padding:6px 12px;">${esc(name)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Email</td><td style="padding:6px 12px;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Company</td><td style="padding:6px 12px;">${esc(company)}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Revenue</td><td style="padding:6px 12px;">${esc(revenue || '—')}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Primary ERP</td><td style="padding:6px 12px;">${esc(erps || '—')}</td></tr>
      <tr><td style="padding:6px 12px;font-weight:bold;">Message</td><td style="padding:6px 12px;">${esc(message || '—')}</td></tr>
    </table>
    <p style="margin-top:16px;font-size:12px;color:#888;">
      Submitted at ${new Date().toISOString()}
    </p>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Quova Website <noreply@quovaos.com>',
        to: ['steve@quovaos.com'],
        subject: `Demo Request — ${name} @ ${company}`,
        html,
        reply_to: email,
      }),
    })

    if (!response.ok) {
      const err = await response.text()
      console.error('Resend error:', err)
      return res.status(502).json({ error: 'Failed to send notification.' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Email send error:', err)
    return res.status(500).json({ error: 'Internal server error.' })
  }
}

// Simple HTML-escape to prevent injection
function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
