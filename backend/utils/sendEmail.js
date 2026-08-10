import nodemailer from "nodemailer";

const smtpConfigured = () =>
  process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS;

export const sendResetEmail = async (to, resetUrl) => {
  const subject = "Reset your DarkPattern Shop password";
  const html = `
    <p>You requested a password reset.</p>
    <p><a href="${resetUrl}">Click here to reset your password</a> (link expires in 30 minutes).</p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `;

  if (!smtpConfigured()) {
    // No SMTP set up -- fine for a demo/testing deployment. Print the link
    // instead so you can still complete the reset flow manually.
    console.log("\n=== PASSWORD RESET (SMTP not configured, printing instead) ===");
    console.log(`To: ${to}`);
    console.log(`Reset URL: ${resetUrl}`);
    console.log("================================================================\n");
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_FROM || process.env.SMTP_USER,
    to,
    subject,
    html,
  });
};
