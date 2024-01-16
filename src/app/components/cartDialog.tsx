// dialog.tsx

'use client';

import React from 'react';

import styles from '@/app/components/cartDialog.module.css';

export default function CartDialog({ display, onClose, onGoToCart, children }: {
  display: boolean,
  onClose: (e: React.PointerEvent<HTMLElement>) => void,
  onGoToCart: (e: React.PointerEvent<HTMLElement>) => void,
  children: JSX.Element | JSX.Element[]
}) {
  return (
    <div className={styles.dialog + ' ' + (display ? styles.dialogShown : styles.dialogHidden)}>
      <div className={styles.dialogContainer}>
        <div className={styles.dialogContent}>
          {children}
        </div>
        <div className={styles.dialogFooter}>
          <button className={styles.closeButton + ' custom gray'} onPointerUp={onClose}>Close</button>
          <button className={styles.goToCartButton + ' custom green'} onPointerUp={onGoToCart}>Go to Cart</button>
        </div>
      </div>
    </div>
  );
}
