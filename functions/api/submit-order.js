const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Matches Swedish numbers: +46 / 0046 / 0 followed by 7-9 digits (spaces/hyphens allowed)
const SWEDISH_PHONE_REGEX = /^(?:\+46|0046|0)[\s-]*(?:7[02369]|[1-9]\d{0,2})[\s-]*(?:\d[\s-]*){5,8}$/;

function isValidSwedishPhone(raw) {
  const cleaned = String(raw || '').trim();
  if (!SWEDISH_PHONE_REGEX.test(cleaned)) return false;
  const digits = cleaned.replace(/\D/g, '');
  // Normalized length: 9-10 digits starting with 0, or 11-12 digits starting with 46 / 0046
  if (digits.startsWith('0046')) return digits.length >= 12 && digits.length <= 13;
  if (digits.startsWith('46')) return digits.length >= 10 && digits.length <= 11;
  if (digits.startsWith('0')) return digits.length >= 9 && digits.length <= 10;
  return false;
}

export async function onRequestGet(context) {
  const { env } = context;
  let dbStatus = 'not_bound';

  if (env.DB) {
    try {
      const row = await env.DB.prepare(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='leads'"
      ).first();
      dbStatus = row ? 'leads_table_ok' : 'leads_table_missing';
    } catch (e) {
      dbStatus = `error: ${e.message}`;
    }
  }

  return new Response(
    JSON.stringify({
      ok: true,
      route: '/api/submit-order',
      has_db: Boolean(env.DB),
      db_status: dbStatus,
      has_sheets_webhook: Boolean(env.SHEETS_WEBHOOK_URL),
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    const name = String(data.name || '').trim();
    const email = String(data.email || '').trim();
    const phone = String(data.phone || '').trim();

    if (!name || !email || !phone) {
      return new Response(JSON.stringify({ error: 'Name, email, and phone are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!EMAIL_REGEX.test(email)) {
      return new Response(JSON.stringify({ error: 'Please enter a valid email address.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!isValidSwedishPhone(phone)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid Swedish phone number (e.g., 070-123 45 67 or +46 70 123 45 67).' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const dishesSummary = Array.isArray(data.selected_dishes)
      ? data.selected_dishes
          .map((d) => (Number(d.extra_price) > 0 ? `${d.name} (+${d.extra_price})` : d.name))
          .join(', ')
      : String(data.selected_dishes || '').trim();

    const notesText = String(data.notes || '').trim();
    const formattedTotal = `${Number(data.total_price || 0)} ${data.currency || 'SEK'}`;

    // 1. Primary Safe Storage: Cloudflare D1
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO leads (name, email, phone, event_date, guests, package_name, selected_dishes, total_price, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          name,
          email,
          phone,
          String(data.event_date || ''),
          Number(data.guests || 0),
          String(data.package_name || ''),
          dishesSummary,
          Number(data.total_price || 0),
          notesText
        )
        .run();
    }

    // 2. Mirror Copy to Google Sheets Apps Script Webhook
    if (env.SHEETS_WEBHOOK_URL) {
      try {
        await fetch(env.SHEETS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          redirect: 'follow',
          body: JSON.stringify({
            timestamp: new Date().toISOString(),
            name,
            email,
            phone,
            event_date: String(data.event_date || ''),
            guests: Number(data.guests || 0),
            package_name: String(data.package_name || ''),
            selected_dishes: dishesSummary,
            dishes: dishesSummary,
            total_price: formattedTotal,
            notes: notesText,
          }),
        });
      } catch (sheetErr) {
        console.error('Google Sheets mirror failed:', sheetErr);
      }
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message || 'Server error saving lead.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}