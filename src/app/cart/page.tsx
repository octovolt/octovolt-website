// cart/page.tsx

'use client'

import AmountManager from '@/app/components/amountManager';
import CartBreadCrumbs from '@/app/components/cartBreadCrumbs';
import Link from 'next/link';
import Subtotal from '@/app/components/subtotal';

import React from 'react';

import { useContext } from 'react';
import { useRouter } from 'next/navigation';

import { CartActions, CartSelection } from '@/lib/cartReducer';
import { CartContext, CartDispatchContext } from '@/lib/cartContext'

import utilStyles from '@/styles/utils.module.css';
import cartStyles from '@/styles/cart.module.css';

interface CartItem {
  name: string,
  option: string,
  price: number,
  amount: number
}

export default function Cart(): JSX.Element {
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  const router = useRouter();

  const displayedCart: CartItem[] = cart.reduce((accum: CartItem[], current: CartSelection) => {
    const idx = accum.findIndex((item: CartItem) => item.name === current.name && item.option === current.option);
    if (idx >= 0) {
      accum[idx].amount++;
    } else {
      accum.push({
        name: current.name,
        option: current.option,
        price: current.price,
        amount: 1,
      });
    }
    return accum;
  }, []);

  const subtotal = cart.reduce((accum: number, current: CartSelection) => {
    return accum + current.price;
  }, 0);

  const onDecrement = (name: string, option: string) => {
    dispatch({
      type: CartActions.DECREMENTED,
      name: name,
      option: option,
    });
  }

  const onIncrement = (name: string, option: string) => {
    dispatch({
      type: CartActions.INCREMENTED,
      name: name,
      option: option,
    });
  }

  function onNext(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    router.push('/cart/shipping');
  }

  const cartList = (
    <ul className={cartStyles.cartList}>
      {displayedCart.map(({ name, option, price, amount }) => (
        <li className={cartStyles.cartListItem} key={name+option}>
          <Link className={cartStyles.itemName} href={`/product/${name.toLowerCase()}`}>{name}</Link>
          <div className={cartStyles.itemDetails}>
            <span className={cartStyles.itemOption}>{option}</span>
            <div className={cartStyles.itemNumbers}>
              <AmountManager
                amount={amount}
                onDecrement={() => { onDecrement(name, option) }}
                onIncrement={() => { onIncrement(name, option) }}
              />
              <span className={cartStyles.priceContainer}>
                <span>@</span>
                <span className={cartStyles.price}>{`$${price}`}</span>
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );

  return (
      <section className={cartStyles.cartContainer}>
        <div className={cartStyles.headingContainer}>
          <h2 className={utilStyles.headingLg}>Cart</h2>
          <CartBreadCrumbs stepName="Cart" nextEnabled={cart.length > 0} />
        </div>
        <div className={utilStyles.twoColumnLayout}>
          <div className={utilStyles.mainColumn}>
            {cart.length === 0
              ? <p>No items in cart.</p>
              : cartList
            }
          </div>
          <div className={utilStyles.sideColumn}>
            <Subtotal subtotal={subtotal} shippingCost={-1} taxes={-1} />
            <div className={cartStyles.callToActionContainer}>
              <button
                className={cartStyles.nextButton + ' custom green'}
                disabled={cart.length === 0}
                onClick={onNext}>
                  Go to Shipping
              </button>
            </div>
          </div>
        </div>
      </section>
  );
}

