import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;
  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  const msg = {
    to: email,
    from: process.env.FROM_EMAIL,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
    html: `<strong>Your OTP code is: ${otp}</strong>`
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, otp });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
}