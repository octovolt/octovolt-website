// cartBadge.tsx

'use client'

import React from 'react';

import { CartContext } from '../../lib/cartContext';
import { useContext } from 'react';

import styles from './header.module.css';

export default function CartBadge() {
  const cart = useContext(CartContext);
  const itemsInCart = cart ? cart.length : 0;

  return itemsInCart > 0
    ? (
        <div className={styles.cartBadge}>{itemsInCart}</div>
      )
    : null;
}