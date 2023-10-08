import React from 'react';

import cartStyles from '@/styles/cart.module.css';

interface SubtotalProps {
  subtotal: number,
  shippingCost: number,
  taxes: number,
};

export default function Subtotal({ subtotal, shippingCost, taxes }: SubtotalProps): JSX.Element {
  return (
    <div className={cartStyles.subtotalContainer}>
      <p className={cartStyles.cartSubtotal}>
        Subtotal: <span>${subtotal.toFixed(2)}</span>
      </p>
      <p className={cartStyles.cartSubtotal}>
        Shipping: <span>${shippingCost >= 0 ? shippingCost.toFixed(2) : ' ---'}</span>
      </p>
      <p className={cartStyles.cartSubtotal}>
        Taxes: <span>${taxes >= 0 ? taxes.toFixed(2) : ' ---'}</span>
      </p>
      <p className={cartStyles.cartSubtotal}>
        Total: <span>${taxes >= 0 && shippingCost >= 0 ? (subtotal + shippingCost + taxes).toFixed(2) : ' ---'}</span>
      </p>
    </div>
  );
}