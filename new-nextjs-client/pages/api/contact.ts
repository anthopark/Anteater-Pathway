import * as nodemailer from 'nodemailer';
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  error: string;
};

const sendContactEmail = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 456,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: 'SMTP_PASSWORD',
    },
  });

  try {
    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_RECIPIENT,
      subject: `[Anteaterpathway.com] Contact Message from ${name}`,
      html: `<p><strong>Name: </strong> ${name}</p><br>
             <p><strong>Email: </strong> ${email}</p><br>
             <p><strong>Message: </strong> ${message}</p><br>`,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message || error.toString() });
    }
  }

  return res.status(200).json({ error: '' });
};

export default sendContactEmail;
