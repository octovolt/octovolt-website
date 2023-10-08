// basicLayout.tsx

import Link from 'next/link';
import React from 'react';

import '../global.css'
import styles from '../layout.module.css';

export default function BasicLayout({ children }: { children: React.ReactNode}) {
  return (
    <>
      <main className={styles.main}>{children}</main>
      <hr />
      <div className={styles.backToHome}>
        <Link href="/">← Back to home</Link>
      </div>
    </>
  );
}