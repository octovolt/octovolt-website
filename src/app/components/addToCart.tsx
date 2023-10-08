'use client';

import AmountManager from '@/app/components/amountManager';

import * as React from 'react';

import { CartActions } from '@/lib/cartReducer';
import { CartDispatchContext } from '@/lib/cartContext';
import { useContext, useState } from "react";

import { Product } from '@/lib/products';

import productStyles from '@/styles/product.module.css';

interface AddToCartProps {
  productData: Product;
}

export default function AddToCart({ productData }: AddToCartProps) {
  const dispatch = useContext(CartDispatchContext);

  // The state of how many items have been selected.
  const [amount, setAmount] = useState(1);

  // The state of what option has been selected.
  const [selection, setSelection] = useState(() => {
    const initialOption = productData.purchasingOptions[0];
    return {
      name: productData.name,
      option: Object.keys(initialOption)[0],
      price: Object.values(initialOption)[0],
    };
  });

  // DOM event handlers
  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = productData.purchasingOptions.find(
      (opt) => Object.keys(opt)[0] === (e.currentTarget.value as String)
    );
    if (selectedOption === undefined) {
      return;
    }

    setSelection({
      name: productData.name,
      option: Object.keys(selectedOption)[0],
      price: Object.values(selectedOption)[0],
    });
  }

  const onDecrement = (e: React.PointerEvent<HTMLElement>) => {
    setAmount(amount > 0 ? amount - 1 : 0);
  }

  const onIncrement = (e: React.PointerEvent<HTMLElement>) => {
    if (amount >= 4) {
      alert("Please contact us about larger orders.");
    } else {
      setAmount(amount + 1);
    }
  }

  const onAddToCart = (e: React.MouseEvent<HTMLElement>) => {
    dispatch({
      type: CartActions.ADDED,
      amount: amount,
      selection: selection,
    })
  }

  return (
    <div className={productStyles.purchasing}>
      <select className={productStyles.purchasingOptions} onChange={onSelect}>
        {productData.purchasingOptions.map((option) => {
          const key = Object.keys(option)[0];
          return (
            <option key={key} value={key}>
              {key}: ${Object.values(option)[0]}
            </option>
          );
        })}
      </select>
      <AmountManager amount={amount} onDecrement={onDecrement} onIncrement={onIncrement} />
      <button className={productStyles.addToCart} onClick={onAddToCart}>Add to Cart</button>
    </div>
  )

}