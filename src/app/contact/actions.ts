// app/contact/actions.ts

'use server'

import nodemailer from 'nodemailer';

import { redirect } from 'next/navigation';

export async function sendMessage(formData: FormData) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp-relay.sendinblue.com',
      port: 587,
      secure: true,
      auth: {
        user: process.env.TRANSACTIONAL_EMAIL_USER,
        pass: process.env.TRANSACTIONAL_EMAIL_PASSWORD,
      },
    });
    transporter.sendMail({
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `[CONTACT FORM] ${formData.get('subject')}`,
      text: `
        Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Subject: ${formData.get('subject')}
        -------------------------------------
        Message:

        ${formData.get('message')}`,
    });

    redirect(`/contact/success`);
  } catch (_error) {
    redirect(`/contact/error`);
  }
}