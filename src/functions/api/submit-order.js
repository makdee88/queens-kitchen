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
      ? data.selected_dishes.map((d) => d.name).join(', ')
      : '';

    // 1. Primary Safe Storage: Insert into Cloudflare D1 (binding name: DB)
    if (env.DB) {
      await env.DB.prepare(
        `INSERT INTO leads (name, email, phone, event_date, guests, package_name, selected_dishes, total_price)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      )
        .bind(
          String(data.name),
          String(data.email),
          String(data.phone),
          String(data.event_date || ''),
          Number(data.guests || 0),
          String(data.package_name || ''),
          dishesSummary,
          Number(data.total_price || 0)
        )
        .run();
    }

    // 2. Optional Mirror: Forward a copy to Google Sheets Apps Script Webhook
    if (env.SHEETS_WEBHOOK_URL) {
      await fetch(env.SHEETS_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: data.name,
          email: data.email,
          phone: data.phone,
          event_date: data.event_date || '',
          guests: data.guests,
          package_name: data.package_name,
          dishes: dishesSummary,
          total_price: `${data.total_price} ${data.currency || 'SEK'}`,
          notes: data.notes || '',
        }),
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Server error saving lead.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}