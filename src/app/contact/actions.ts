'use server'

import nodemailer from 'nodemailer';

import { redirect } from 'next/navigation';

export async function sendMessage(formData: FormData) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      },
    });
    transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `[CONTACT FORM] ${formData.get('subject')}`,
      text: `${formData.get('message')}`,
    });

    redirect(`/contact/success`);
  } catch (_error) {
    redirect(`/contact/error`);
  }
}

