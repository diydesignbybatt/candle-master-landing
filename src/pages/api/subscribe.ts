/**
 * Email Subscription API Endpoint
 * Handles newsletter signups and desktop waitlist using Resend
 *
 * Environment variable required:
 * - RESEND_API_KEY: Your Resend API key
 *
 * To set up:
 * 1. Create account at https://resend.com
 * 2. Get API key from dashboard
 * 3. Add to wrangler.toml or Cloudflare dashboard:
 *    [vars]
 *    RESEND_API_KEY = "re_xxxxx"
 */

import type { APIRoute } from 'astro';

interface SubscribeRequest {
  email: string;
  desktop_waitlist: boolean;
  newsletter: boolean;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const data: SubscribeRequest = await request.json();

    // Validate email
    if (!data.email || !isValidEmail(data.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Check if at least one option is selected
    if (!data.desktop_waitlist && !data.newsletter) {
      return new Response(JSON.stringify({ error: 'Please select at least one option' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Get Resend API key from environment
    const resendApiKey = import.meta.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured');
      // Still return success to not break UX, but log the error
      // In production, you might want to store these emails in KV as backup
      return new Response(JSON.stringify({
        success: true,
        message: 'Thank you for subscribing!',
        note: 'Email service configuration pending'
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Prepare tags based on preferences
    const tags = [];
    if (data.desktop_waitlist) tags.push({ name: 'desktop_waitlist', value: 'true' });
    if (data.newsletter) tags.push({ name: 'newsletter', value: 'true' });
    tags.push({ name: 'source', value: 'landing_page' });

    // Add contact to Resend audience
    // Note: You'll need to create an audience in Resend dashboard first
    // and replace 'YOUR_AUDIENCE_ID' with the actual ID
    const response = await fetch('https://api.resend.com/audiences/YOUR_AUDIENCE_ID/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: data.email,
        unsubscribed: false,
        // Resend doesn't support tags directly on contacts yet
        // Store preferences in first_name/last_name temporarily or use a different approach
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend API error:', errorData);

      // If it's a duplicate email, still return success
      if (errorData.message?.includes('already exists')) {
        return new Response(JSON.stringify({
          success: true,
          message: 'You are already subscribed!'
        }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      throw new Error('Failed to add contact');
    }

    // Send welcome email (optional)
    const welcomeSubject = data.desktop_waitlist
      ? '🎮 Welcome to Candle Master - Desktop Waitlist'
      : '🎮 Welcome to Candle Master Newsletter';

    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Candle Master <noreply@candlemaster.app>',
        to: data.email,
        subject: welcomeSubject,
        html: getWelcomeEmailHTML(data),
      }),
    });

    return new Response(JSON.stringify({
      success: true,
      message: 'Successfully subscribed!'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function getWelcomeEmailHTML(data: SubscribeRequest): string {
  const preferences = [];
  if (data.desktop_waitlist) preferences.push('Desktop version updates');
  if (data.newsletter) preferences.push('Trading tips & news');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #0f172a; color: #e2e8f0; padding: 40px 20px;">
      <div style="max-width: 500px; margin: 0 auto; background: #1e293b; border-radius: 16px; padding: 32px; border: 1px solid #334155;">
        <h1 style="color: #f59e0b; margin: 0 0 16px 0; font-size: 24px;">🕯️ Welcome to Candle Master!</h1>

        <p style="margin: 0 0 24px 0; line-height: 1.6;">
          Thank you for joining our community! You're now signed up for:
        </p>

        <ul style="margin: 0 0 24px 0; padding-left: 20px; line-height: 1.8;">
          ${preferences.map(p => `<li>${p}</li>`).join('')}
        </ul>

        <p style="margin: 0 0 24px 0; line-height: 1.6;">
          Ready to practice trading with legendary stocks from 1980-2025? Start playing for free now!
        </p>

        <a href="https://app.candlemaster.app" style="display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: #0f172a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
          Play Free Now →
        </a>

        <hr style="border: none; border-top: 1px solid #334155; margin: 32px 0;">

        <p style="margin: 0; font-size: 12px; color: #64748b;">
          You received this email because you signed up at candlemaster.app.
          <a href="https://candlemaster.app/unsubscribe" style="color: #64748b;">Unsubscribe</a>
        </p>
      </div>
    </body>
    </html>
  `;
}
