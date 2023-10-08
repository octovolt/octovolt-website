// cart/checkout/page.tsx

'use client'

import React from 'react';

import AddressForm from '@/app/components/addressForm';
import CartBreadCrumbs from '@/app/components/cartBreadCrumbs';
import PaymentForm from '@/app/components/paymentForm';
import Subtotal from '@/app/components/subtotal';

import { useContext, useState, useEffect } from 'react';

import { AddressFormField } from '@/app/components/addressForm';
import { CartSelection } from '@/lib/cartReducer';
import { CartContext } from '@/lib/cartContext';
import { PaymentFormField } from '../../components/paymentForm';

import cartStyles from '@/styles/cart.module.css';
import formStyles from '@/styles/form.module.css';
import utilStyles from '@/styles/utils.module.css';

interface CtaProps {
  onCtaClick: (e: React.MouseEvent<HTMLElement>) => void,
  billingAddressValid: boolean,
  paymentInfoValid: boolean,
  paymentInfo: {[key: string]: string},
}

function CtaButton({ ...props }: CtaProps): JSX.Element {
  return (
    <div className={cartStyles.callToActionContainer}>
      <button
        className={cartStyles.nextButton}
        disabled={!props.billingAddressValid || !props.paymentInfoValid} onClick={props.onCtaClick}>
        {props.paymentInfo.paymentMethod === "creditCard" ? `Place Order` : `Continue to PayPal`}
      </button>
    </div>
  )
}

export default function Checkout(): JSX.Element {
  // FIXME: this is a hack to get around the fact that the radio buttons are not not working
  // in development mode. Please see: https://github.com/vercel/next.js/issues/49499
  if (process.env.NODE_ENV === 'development') {
    useEffect(() => {
      document.querySelectorAll('input[type=radio]').forEach((elem) => {
        if (elem.hasAttribute('checked')) {
          (elem as HTMLInputElement).checked = true
        }
      });
    }, []);
  }

  const cart = useContext(CartContext);

  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [billingAddress, setBillingAddress] = useState({
    [AddressFormField.Name]: '',
    [AddressFormField.Country]: '',
    [AddressFormField.Address]: '',
    [AddressFormField.City]: '',
    [AddressFormField.Province]: '',
    [AddressFormField.PostalCode]: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    [PaymentFormField.PaymentMethod]: 'creditCard',
    [PaymentFormField.CardName]: '',
    [PaymentFormField.CardNumber]: '',
    [PaymentFormField.CardExpiration]: '',
    [PaymentFormField.CardSecurityCode]: '',
  });

  const [billingAddressValid, setBillingAddressValid] = useState(true);
  const [paymentInfoValid, setPaymentInfoValid] = useState(false);

  const subtotal = cart.reduce((accum: number, current: CartSelection) => {
    return accum + current.price;
  }, 0);

  function onSameAsShippingChanged(e: React.ChangeEvent<HTMLInputElement>) {
    console.log('onSameAsShippingChanged', e.target.checked);
    const updatedSameAsShipping = e.target.checked;
    setSameAsShipping(updatedSameAsShipping);
    validateBillingAddress(updatedSameAsShipping, billingAddress);
  };

  function onAddressFormChange({ fieldName, value }: {fieldName: AddressFormField, value: string}) {
    const updatedBillingAddress = {...billingAddress, [fieldName]: value};
    setBillingAddress(updatedBillingAddress);
    validateBillingAddress(sameAsShipping, updatedBillingAddress);
  };

  function validateBillingAddress(updatedSameAsShipping: boolean, updatedBillingAddress: {[key: string]: string}) {
    // todo - validate address in a better way
    setBillingAddressValid(
      paymentInfo[PaymentFormField.PaymentMethod] === "paypal" ||
      updatedSameAsShipping || (
        updatedBillingAddress[AddressFormField.Name].length > 0 &&
        updatedBillingAddress[AddressFormField.Country].length >= 2 &&
        updatedBillingAddress[AddressFormField.Address].length > 0 &&
        updatedBillingAddress[AddressFormField.City].length > 0 &&
        updatedBillingAddress[AddressFormField.Province].length >= 2 &&
        updatedBillingAddress[AddressFormField.PostalCode].length > 0
      )
    );
  }

  function onPaymentMethodChange(e: React.ChangeEvent<HTMLInputElement>) {
    const updatedPaymentInfo = {...paymentInfo, [PaymentFormField.PaymentMethod]: e.target.value};
    setPaymentInfo(updatedPaymentInfo);
    if (e.target.value === 'paypal') {
      setPaymentInfoValid(true);
    } else {
      validatePaymentInfo(updatedPaymentInfo);
    }
  }

  function onPaymentFormChange({ fieldName, value }: {fieldName: PaymentFormField, value: string}) {
    const updatedPaymentInfo = {...paymentInfo, [fieldName]: value};
    setPaymentInfo(updatedPaymentInfo);
    validatePaymentInfo(updatedPaymentInfo);
  };

  function validatePaymentInfo(updatedPaymentInfo: {[key: string]: string}) {
    // todo - validate credit card info in a better way
    setPaymentInfoValid(
      updatedPaymentInfo[PaymentFormField.CardName] !== '' &&
      updatedPaymentInfo[PaymentFormField.CardNumber] !== '' &&
      updatedPaymentInfo[PaymentFormField.CardExpiration] !== '' &&
      updatedPaymentInfo[PaymentFormField.CardSecurityCode] !== '',
    );
  }

  function onCtaClick(e: React.MouseEvent<HTMLElement>) {
    e.preventDefault();
    if (paymentInfo[PaymentFormField.PaymentMethod] === 'paypal') {
      console.log('TODO: redirect to paypal');
      // redirect to paypal
      // on success, place order
    } else {
      console.log('TODO: place order');
    }
  };

  // TODO: remove temporary fake values
  const shippingCost = 4.50;
  const taxes = subtotal * 0.09;

  return (
    <>
      <div className={cartStyles.headingContainer}>
        <h2 className={utilStyles.headingLg}>Checkout</h2>
        <CartBreadCrumbs stepName="Checkout" nextEnabled={taxes >= 0 && shippingCost >= 0} />
      </div>
      <div className={utilStyles.twoColumnLayout}>
        <div className={utilStyles.mainColumn}>
          <section>
            <PaymentForm
              formClassNames={`${formStyles.form} ${cartStyles.paymentOptionsForm}`}
              fieldSetClassNames={formStyles.fields}
              textFieldClassNames={formStyles.textField}
              showFields={paymentInfo[PaymentFormField.PaymentMethod] === "creditCard"}
              callback={onPaymentFormChange}>
              <h3 className={utilStyles.headingLg}>Payment Options</h3>
              <div className={cartStyles.paymentOptions}>
                <div key="creditCardRadioButtonContainer">
                  <input
                    type="radio"
                    id="creditCard"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentInfo[PaymentFormField.PaymentMethod] === "creditCard"}
                    onChange={onPaymentMethodChange}
                  />
                  <label htmlFor="creditCard">Visa / Mastercard</label>
                </div>
                <div key="paypalRadioButtonContainer">
                  <input
                    type="radio"
                    id="paypal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentInfo[PaymentFormField.PaymentMethod] === "paypal"}
                    onChange={onPaymentMethodChange}
                  />
                  <label htmlFor="paypal">PayPal</label>
                </div>
              </div>
            </PaymentForm>
          </section>
          <section style={{display: paymentInfo.paymentMethod === 'creditCard' ? 'block' : 'none'}}>
            <AddressForm
              formClassNames={`${formStyles.form} ${cartStyles.billingAddressForm}`}
              fieldSetClassNames={formStyles.fields}
              textFieldClassNames={formStyles.textField}
              showFields={!sameAsShipping}
              callback={onAddressFormChange}>
              <h3 className={utilStyles.headingLg}>Billing Address</h3>
              <div className={cartStyles.sameAsShipping}>
                <input
                  type="checkbox"
                  id="sameAsShipping"
                  name="sameAsShipping"
                  defaultChecked={true}
                  onChange={onSameAsShippingChanged}
                />
                <label htmlFor="sameAsShipping">Same as shipping address</label>
              </div>
            </AddressForm>
          </section>
        </div>
        <div className={utilStyles.sideColumn}>
          <Subtotal subtotal={subtotal} shippingCost={shippingCost} taxes={taxes} />
          <CtaButton
            onCtaClick={onCtaClick}
            billingAddressValid={billingAddressValid}
            paymentInfoValid={paymentInfoValid}
            paymentInfo={paymentInfo}
          />
        </div>
      </div>
    </>
  );
}

