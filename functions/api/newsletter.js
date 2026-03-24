export async function onRequestPost(context) {
  const { request, env } = context;
  const origin = request.headers.get('Origin');

  const ALLOWED_ORIGINS = [
    'http://localhost:2323',
    'https://johnny.ae',
    'https://www.johnny.ae',
    'https://johnny-4o8.pages.dev',
  ];

  const corsHeaders = {
    'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  try {
    const { email } = await request.json();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Valid email is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Johnny.ae <noreply@johnny.ae>',
        to: ['johnny@johnny.ae', 'hi@johnny.ae'],
        subject: '[johnny.ae] New Newsletter Subscriber',
        html: `
          <h2>New Newsletter Subscription</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subscribed at:</strong> ${new Date().toISOString()}</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            This subscription was received from johnny.ae
          </p>
        `,
      }),
    });

    if (res.ok) {
      return new Response(JSON.stringify({ success: true, message: 'Subscribed!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else {
      const error = await res.text();
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to subscribe' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    }
  } catch (error) {
    console.error('Function error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }
}

export async function onRequestOptions(context) {
  const origin = context.request.headers.get('Origin');
  const ALLOWED_ORIGINS = [
    'http://localhost:2323',
    'https://johnny.ae',
    'https://www.johnny.ae',
    'https://johnny-4o8.pages.dev',
  ];

  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
