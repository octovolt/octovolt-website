/**
 * The purpose of this component is to provide state management for the cart, which spans across
 * multiple pages and both the header menu and the main area of the pages. This should be
 * isolated from the RootLayout component in app/layout.tsx to ensure that the meta tags are
 * delivered with server rendered html and not client rendered html.
 *
 * Additionally, this component handles the dismissal of the mobile header menu when the user clicks
 * outside of it.
 */

'use client'

import React from 'react';

import { PropsWithChildren, useEffect } from 'react';

import Header from '@/app/components/header';
import { CartContext, CartDispatchContext } from '@/lib/cartContext';

import { dismissMenu } from '@/app/components/menu';
import { useCartReducer } from '@/lib/cartReducer';

import styles from '@/app/layout.module.css';

interface CartReducerProviderProps {
  name: string;
  tagline: string;
};

export default function Body({ children, ...props }: PropsWithChildren<CartReducerProviderProps>) {
  const [cart, dispatch] = useCartReducer();
  useEffect(() => {
    console.log(`
  w e l c o m e   t o
  ___   ___ _____ _____   _____  _  _____
 / _ \\ / __|_   _/ _ \\ \\ / / _ \\| ||_   _|
| (_) | (__  | || (_) \\ V / (_) | |__| |
 \\___/ \\___| |_| \\___/ \\_/ \\___/|____|_|`);
  }, []);

  return (
    <body onPointerDown={dismissMenu} style={{fontSize: 16}}>
      <CartContext.Provider value={cart}>
        <CartDispatchContext.Provider value={dispatch}>
          <Header name={props.name} tagline={props.tagline} />
          <div className={styles.container}>
            {children}
          </div>
        </CartDispatchContext.Provider>
      </CartContext.Provider>
    </body>
  );
}