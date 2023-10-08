// cartNumber.tsx

'use client'

import React from 'react';

import { CartContext } from '../../lib/cartContext';
import { useContext } from 'react';

export default function CartNumber() {
  const cart = useContext(CartContext);
  const itemsInCart = cart ? cart.length : 0;

  return (
    <span>{itemsInCart > 0 ? ` (${itemsInCart})` : ''}</span>
  );
}