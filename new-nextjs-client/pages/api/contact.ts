import * as nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error?: string;
  message?: string;
};

const sendContactEmail = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_RECIPIENT,
      subject: `[Anteaterpathway.com] Contact Message from ${email}`,
      html: `
             <p><strong>Email: </strong> ${email}</p><br>
             <p><strong>Message: </strong> ${message}</p><br>`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  }

  return res.status(200).json({ message: 'Email sent successfully.' });
};

export default sendContactEmail;
