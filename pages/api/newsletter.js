import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    try {
      await sgMail.send({
        from: 'Johnny <johnny@johnny.ae>',
        to: email,
        subject: 'Newsletter Subscription Confirmed',
        html: '<p>Thank you for subscribing to our newsletter!</p>',
      });

      return res.status(200).json({ message: 'Successfully subscribed!' });
    } catch (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ error: 'Something went wrong.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}