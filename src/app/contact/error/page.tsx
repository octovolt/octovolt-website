// contact/error/page.tsx

import React from 'react';

import contactStyles from '@/styles/contact.module.css';
import utilStyles from '@/styles/utils.module.css';

export default function ContactError() {
  return (
    <section className={utilStyles.singleSection}>
      <h2 className={utilStyles.headingLg}>Message Error</h2>
      <p className={contactStyles.errorMessage}>
        Sorry, an error occurred and your message was not sent. Please try again later.
      </p>
    </section>
  );
}