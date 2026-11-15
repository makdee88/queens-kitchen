export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    if (!data.name || !data.email || !data.phone) {
      return new Response(JSON.stringify({ error: 'Name, email, and phone are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const dishesSummary = Array.isArray(data.selected_dishes)
      ? data.selected_dishes
          .map((d) => (Number(d.extra_price) > 0 ? `${d.name} (+${d.extra_price})` : d.name))
          .join(', ')
      : '';

    const notesText = String(data.notes || '').trim();
    const formattedTotal = `${Number(data.total_price || 0)} ${data.currency || 'SEK'}`;

    // 1. Primary Safe Storage: Insert into Cloudflare D1 (binding name: DB)
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO leads (name, email, phone, event_date, guests, package_name, selected_dishes, total_price, notes)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          String(data.name),
          String(data.email),
          String(data.phone),
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
            name: String(data.name),
            email: String(data.email),
            phone: String(data.phone),
            event_date: String(data.event_date || ''),
            guests: Number(data.guests || 0),
            package_name: String(data.package_name || ''),
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
    console.error('Submit order error:', err);
    return new Response(JSON.stringify({ error: 'Server error saving lead.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}