// app/contact/page.tsx

import React from 'react';

import { sendMessage } from './actions';

import contactStyles from '@/styles/contact.module.css';
import formStyles from '@/styles/form.module.css';
import utilStyles from '@/styles/utils.module.css';

export default function Contact() {
  return (
      <section className={utilStyles.singleSection}>
        <h2 className={utilStyles.headingLg}>Contact</h2>
        <form className={`${formStyles.form} ${contactStyles.contactForm}`} action={sendMessage}>
          <fieldset className={formStyles.fields}>
            <label htmlFor="name">Name</label>
            <input
              required
              className={`${formStyles.textField} ${contactStyles.textField}`}
              type="text"
              id="name"
              name="name"
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              aria-label="Name"
              aria-required="true"
              placeholder="Your Name"
            />
            <label htmlFor="email">Email</label>
            <input
              required
              className={`${formStyles.textField} ${contactStyles.textField}`}
              type="email"
              id="email"
              name="email"
              aria-label="Email"
              aria-required="true"
              placeholder="address@whatever.com"
            />
            <label htmlFor="email">Subject</label>
            <input
              required
              className={`${formStyles.textField} ${contactStyles.textField}`}
              type="text"
              id="subject"
              name="subject"
              aria-label="Subject"
              aria-required="true"
              placeholder="Subject"
            />
            <label htmlFor="message">Message</label>
            <textarea
              required
              className={`${formStyles.textArea} ${contactStyles.textArea}`}
              id="message"
              name="message"
              aria-label="Message"
              aria-required="true"
              placeholder="Your Message"
            />
          </fieldset>
          <div className={contactStyles.sendWrap}>
            <input className={contactStyles.send} type="submit" value="Send" />
          </div>
        </form>
      </section>
  );
}