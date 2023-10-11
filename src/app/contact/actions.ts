// app/contact/actions.ts

'use server'

import nodemailer from 'nodemailer';

import { redirect } from 'next/navigation';

export async function sendMessage(formData: FormData) {
  const transporter = nodemailer.createTransport({
    // host: 'smtp-relay.brevo.com',
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    secure: true,
    tls: { ciphers:'SSLv3' },
    auth: {
      user: process.env.TRANSACTIONAL_EMAIL_USER,
      pass: process.env.TRANSACTIONAL_EMAIL_PASSWORD,
    },
  });

  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log("Server is ready to take our messages");
        resolve(success);
      }
    });
  });

  await new Promise((resolve, reject) => {
    transporter.sendMail({
      from: process.env.CONTACT_EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `[CONTACT FORM] ${formData.get('subject')}`,
      text: `
        Name: ${formData.get('name')}
        Email: ${formData.get('email')}
        Subject: ${formData.get('subject')}
        -------------------------------------
        Message: ${formData.get('message')}`,
    }, (error, info) => {
      if (error) {
        console.log(`Octovolt Error: ${error}`);
        reject(error);
        redirect(`/contact/error`);
      } else {
        console.log(`Message sent: ${info}`);
        resolve(info);
        redirect(`/contact/success`);
      }
    });
  });
}