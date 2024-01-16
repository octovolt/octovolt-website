// cart/shipping/page.tsx

'use client'

import React from 'react';

import AddressForm from '@/app/components/addressForm';
import CartBreadCrumbs from '@/app/components/cartBreadCrumbs';
import Subtotal from '@/app/components/subtotal';

import { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';

import { CartSelection } from '@/lib/cartReducer';
import { CartContext } from '@/lib/cartContext';

import { AddressFormField } from '@/app/components/addressForm';

import cartStyles from '@/styles/cart.module.css';
import formStyles from '@/styles/form.module.css';
import utilStyles from '@/styles/utils.module.css';

interface CtaProps {
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
  onCalculate: (e: React.MouseEvent<HTMLElement>) => void,
  shippingAddressValid: boolean,
  taxes: number,
  shippingCost: number,
  cartLength: number,
}

function CtaButton({ ...props }): JSX.Element {
  return (
    <div className={cartStyles.callToActionContainer}>
        {props.taxes >= 0 && props.shippingCost >= 0 ? (
          <button className={cartStyles.checkoutButton + ' custom green'} disabled={!props.shippingAddressValid || props.cartLength === 0} onClick={props.onCheckout}>Go to Checkout</button>
        ) : (
          <button className={cartStyles.calculateButton + ' custom lightgray'} disabled={props.cartLength === 0} onClick={props.onCalculate}>Calculate Total</button>
        )}
    </div>
  )
}

export default function Shipping(): JSX.Element {
  const cart = useContext(CartContext);
  const router = useRouter();
  const [shippingCost, setShippingCost] = useState(-1);
  const [taxes, setTaxes] = useState(-1);
  const [shippingAddress, setShippingAddress] = useState({
    [AddressFormField.Name]: '',
    [AddressFormField.Country]: '',
    [AddressFormField.Address]: '',
    [AddressFormField.City]: '',
    [AddressFormField.Province]: '',
    [AddressFormField.PostalCode]: ''
  });
  const [shippingAddressValid, setShippingAddressValid] = useState(false);

  const subtotal = cart.reduce((accum: number, current: CartSelection) => {
    return accum + current.price;
  }, 0);

  function onCalculate(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (!shippingAddressValid) {
      const form = document.querySelector('.'+cartStyles.shippingAddressForm);
      const fields = form?.querySelectorAll('.'+formStyles.textField);
      fields?.forEach((field) => {
        const input = field as HTMLInputElement | HTMLSelectElement;
        input.focus();
        input.blur();
      });
    }
    setShippingCost(4.50);
    setTaxes(subtotal * 0.09);
  }

  function onCheckout(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    router.push('/cart/checkout');
  }

  function onAddressFormChange({ fieldName, value }: {fieldName: AddressFormField, value: string}) {
    const updatedAddress = {...shippingAddress, [fieldName]: value};
    setShippingAddressValid(
      updatedAddress[AddressFormField.Name].length > 0 &&
      updatedAddress[AddressFormField.Country].length >= 2 &&
      updatedAddress[AddressFormField.Address].length > 0 &&
      updatedAddress[AddressFormField.City].length > 0 &&
      updatedAddress[AddressFormField.Province].length >= 2 &&
      updatedAddress[AddressFormField.PostalCode].length > 0
    );
    setShippingAddress(updatedAddress);
  }

  return (
    <section>
      <div className={cartStyles.headingContainer}>
        <h2 className={utilStyles.headingLg}>Shipping</h2>
        <CartBreadCrumbs stepName="Shipping" nextEnabled={taxes >= 0 && shippingCost >= 0} />
      </div>
      <div className={utilStyles.twoColumnLayout}>
        <div className={utilStyles.mainColumn}>
          <AddressForm
            formClassNames={`${formStyles.form} ${cartStyles.shippingAddressForm}`}
            fieldSetClassNames={formStyles.fields}
            textFieldClassNames={formStyles.textField}
            callback={onAddressFormChange}
          />
        </div>
        <div className={utilStyles.sideColumn}>
          <Subtotal subtotal={subtotal} shippingCost={shippingCost} taxes={taxes} />
          <CtaButton
            onCalculate={onCalculate}
            onCheckout={onCheckout}
            shippingAddressValid={shippingAddressValid}
            taxes={taxes}
            shippingCost={shippingCost}
            cartLength={cart.length}
          />
        </div>
      </div>
    </section>
  );
}

