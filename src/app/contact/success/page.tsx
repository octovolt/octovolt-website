// contact/success/page.tsx

import React from 'react';

import contactStyles from '@/styles/contact.module.css';
import utilStyles from '@/styles/utils.module.css';

export default function ContactSuccess() {
  return (
    <section className={utilStyles.singleSection}>
      <h2 className={utilStyles.headingLg}>Message Received</h2>
      <p className={contactStyles.successMessage}>
        Thank you for your message! I will get back to you as soon as I can.
      </p>
    </section>
  );
}