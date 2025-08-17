addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

// Site configurations - add your sites here
const SITE_CONFIGS = {
  'johnny.ae': {
    toEmail: ['johnny@johnny.ae', 'hi@johnny.ae'],
    fromEmail: 'johnny@johnny.ae',
    fromName: 'Johnny.ae'
  },
  // Add more sites as needed:
  // 'example.com': {
  //   toEmail: 'contact@example.com',
  //   fromEmail: 'noreply@example.com',
  //   fromName: 'Example Site'
  // },
  'default': {
    toEmail: 'contact@yourdomain.com',
    fromEmail: 'noreply@yourdomain.com',
    fromName: 'Contact Form'
  }
}

// Allowed origins - add your domains here
const ALLOWED_ORIGINS = [
  'http://localhost:2323',
  'http://localhost:3001',
  'https://johnny.ae',
  // Add more domains as needed
]

async function handleRequest(request) {
  const url = new URL(request.url)
  const origin = request.headers.get('Origin')
  
  // Check if origin is allowed
  const isAllowedOrigin = !origin || ALLOWED_ORIGINS.includes(origin)
  
  // CORS headers
  const corsHeaders = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : ALLOWED_ORIGINS[0],
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  // Only accept POST requests
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: corsHeaders
    })
  }

  // Route to appropriate handler
  if (url.pathname === '/api/newsletter') {
    return handleNewsletter(request, corsHeaders)
  } else if (url.pathname === '/api/contact' || url.pathname === '/') {
    return handleContact(request, corsHeaders)
  } else {
    return new Response('Not found', { 
      status: 404,
      headers: corsHeaders 
    })
  }
}

async function handleNewsletter(request, corsHeaders) {
  try {
    const body = await request.json()
    const { email, site } = body

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Valid email is required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Get site configuration
    const config = SITE_CONFIGS[site] || SITE_CONFIGS['default']

    // SendGrid API request for newsletter
    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: Array.isArray(config.toEmail) 
            ? config.toEmail.map(email => ({ email }))
            : [{ email: config.toEmail }],
        }],
        from: { 
          email: config.fromEmail,
          name: config.fromName
        },
        subject: `[${site || 'Newsletter'}] New Subscriber`,
        content: [{
          type: 'text/html',
          value: `
            <h2>New Newsletter Subscription</h2>
            <p><strong>Site:</strong> ${site || 'Unknown'}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subscribed at:</strong> ${new Date().toISOString()}</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              This subscription was received from ${site || 'your website'}
            </p>
          `
        }]
      }),
    })

    if (sgResponse.ok) {
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Successfully subscribed to newsletter!' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } else {
      const error = await sgResponse.text()
      console.error('SendGrid error:', error)
      
      return new Response(JSON.stringify({ 
        error: 'Failed to subscribe',
        details: error 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  } catch (error) {
    console.error('Worker error:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}

async function handleContact(request, corsHeaders) {
  try {
    const body = await request.json()
    const { name, email, subject, message, projectType, site } = body

    // Validation
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ 
        error: 'All fields are required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ 
        error: 'Invalid email address' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }

    // Get site configuration
    const config = SITE_CONFIGS[site] || SITE_CONFIGS['default']

    // SendGrid API request
    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{
          to: Array.isArray(config.toEmail) 
            ? config.toEmail.map(email => ({ email }))
            : [{ email: config.toEmail }],
        }],
        from: { 
          email: config.fromEmail,
          name: config.fromName
        },
        reply_to: { email: email },
        subject: `[${site || 'Contact Form'}] ${subject}`,
        content: [{
          type: 'text/html',
          value: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Site:</strong> ${site || 'Unknown'}</p>
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
              Sent from ${site || 'contact form'} at ${new Date().toISOString()}
            </p>
          `
        }]
      }),
    })

    if (sgResponse.ok) {
      return new Response(JSON.stringify({ 
        success: true,
        message: 'Your message has been sent successfully!' 
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    } else {
      const error = await sgResponse.text()
      console.error('SendGrid error:', error)
      
      return new Response(JSON.stringify({ 
        error: 'Failed to send message',
        details: error 
      }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      })
    }
  } catch (error) {
    console.error('Worker error:', error)
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    })
  }
}