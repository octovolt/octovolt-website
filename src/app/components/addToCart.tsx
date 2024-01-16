'use client';

import AmountManager from '@/app/components/amountManager';
import CartDialog from '@/app/components/cartDialog';

import { CartActions } from '@/lib/cartReducer';
import { CartDispatchContext } from '@/lib/cartContext';

import { Product } from '@/lib/products';

import { useRouter } from 'next/navigation';
import { useContext, useState } from "react";

import productStyles from '@/styles/product.module.css';
import { on } from 'events';

interface AddToCartProps {
  productData: Product;
}

export default function AddToCart({ productData }: AddToCartProps) {
  const dispatch = useContext(CartDispatchContext);
  const router = useRouter();

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

  // The state of the cart dialog.
  const [dialogDisplay, setDialogDisplay] = useState(false);

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

  const onAddToCart = (e: React.PointerEvent<HTMLElement>) => {
    setDialogDisplay(true);
    dispatch({
      type: CartActions.ADDED,
      amount: amount,
      selection: selection,
    })
  }

  function onDialogClose(e: React.PointerEvent<HTMLElement>) {
    e.stopPropagation();
    setDialogDisplay(false);
    console.log(dialogDisplay);
  }

  function onDialogGoToCart(e: React.PointerEvent<HTMLElement>) {
    e.stopPropagation();
    setDialogDisplay(false);
    router.push('/cart');
  }

  return (
    <>
      <div className={productStyles.purchasing}>
        <div className={productStyles.selectContainer}>
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
        </div>
        <AmountManager amount={amount} onDecrement={onDecrement} onIncrement={onIncrement} />
        <button className={productStyles.addToCart + ' custom green'} onPointerUp={onAddToCart}>Add to Cart</button>
      </div>
      <CartDialog display={dialogDisplay} onClose={onDialogClose} onGoToCart={onDialogGoToCart}>
        <p>{amount} item{amount > 1 ? 's' : ''} added to cart:</p>
        <p>{selection.name}: {selection.option} ({'$' + selection.price})</p>
      </CartDialog>
    </>
  )

}