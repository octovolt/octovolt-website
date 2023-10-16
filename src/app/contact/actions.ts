// app/contact/actions.ts

// Note that process.env environment variables are set outside of the source code.
// If using Vercel for hosting, these variables are set in the Vercel dashboard.

'use server'

import nodemailer from 'nodemailer';

import { redirect } from 'next/navigation';
import { SentMessageInfo } from 'nodemailer/lib/smtp-transport';

export async function sendMessage(formData: FormData) {
  const transporter = nodemailer.createTransport({
    host: 'smtp-relay.sendinblue.com',
    port: 587,
    auth: {
      user: process.env.TRANSACTIONAL_EMAIL_USER,
      pass: process.env.TRANSACTIONAL_EMAIL_PASSWORD,
    },
  });

  await new Promise((resolve, reject) => {
    transporter.verify((error, success) => {
      if (error) {
        console.error(`
          Nodemailer transporter not verified.
          Error: ${error.name} - ${error.message} - ${error.cause} - ${error.stack}
        `);
        reject(error);
      } else {
        console.log('Trransporter verified.')
        resolve(success);
      }
    });
  }).catch((_error) => {
    console.log('Catch: transporter.verify');
    redirect(`/contact/error`);
  });

  await new Promise<SentMessageInfo>((resolve, reject) => {
    transporter.sendMail({
      from: `${formData.get('email')}`,
      to: process.env.CONTACT_EMAIL_TO,
      subject: `[octovolt] ${formData.get('subject')}`,
      text: `
        From: ${formData.get('name')}
        ---
        ${formData.get('message')}`,
    }, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  }).then((info: SentMessageInfo) => {
    console.log(`
      Then: transporter.sendMail
      Message sent: ${JSON.stringify(info)}
    `);
    redirect(`/contact/success`);
  }).catch((error: Error) => {
    console.error(`
      Nodemailer unable to send message.
      Error: ${error.name} - ${error.message} - ${error.cause} - ${error.stack}
    `);
    redirect(`/contact/error`);
  });
}