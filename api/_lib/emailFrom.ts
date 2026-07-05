/** Default outreach sender — override with RESEND_FROM_EMAIL on Vercel / .env.local */
export function getResendFromAddress(): string {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (from) return from;
  return 'Ayabonga Qwabi <aya@qwabi.co.za>';
}
