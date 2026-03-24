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
    const { name, email, subject, message, projectType } = await request.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: 'All fields are required' }), {
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
        reply_to: email,
        subject: `[johnny.ae] ${subject}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          ${projectType ? `<p><strong>Project Type:</strong> ${projectType}</p>` : ''}
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
          <br>
          <p><em>Reply to: ${email}</em></p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Sent from johnny.ae at ${new Date().toISOString()}
          </p>
        `,
      }),
    });

    if (res.ok) {
      return new Response(JSON.stringify({ success: true, message: 'Message sent successfully!' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
    } else {
      const error = await res.text();
      console.error('Resend error:', error);
      return new Response(JSON.stringify({ error: 'Failed to send message' }), {
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
