// paymentForm.tsx

'use client'

import React from 'react';

import TextInput from '@/app/components/textInput';

import { useState } from 'react';

export enum PaymentFormField {
  PaymentMethod = "paymentMethod",
  CardName = "cardName",
  CardNumber = "cardNumber",
  CardExpiration = "cardExpiration",
  CardSecurityCode = "cardSecurityCode",
};

function getFieldName(name: string): PaymentFormField {
  switch (name) {
    case "paymentMethod":
      return PaymentFormField.PaymentMethod;
    case "cardName":
      return PaymentFormField.CardName;
    case "cardNumber":
      return PaymentFormField.CardNumber;
    case "cardExpiration":
      return PaymentFormField.CardExpiration;
    case "cardSecurityCode":
      return PaymentFormField.CardSecurityCode;
    default:
      throw new Error(`Invalid field name: ${name}`);
  }
};

interface PaymentFormProps {
  children: React.ReactNode | React.ReactNode[],
  action?: string,
  disabled?: boolean,
  fieldSetClassNames: string,
  formClassNames: string,
  showFields?: boolean,
  textFieldClassNames: string,
  callback: (fieldData: {fieldName: PaymentFormField, value: string}) => void,
};

const border = '1px solid #888';
const errorBorder = '1px solid #f00';

const PaymentTextInput = TextInput<PaymentFormField>;

// Regex for Visa card names,
// allowing up to 24 characters for the first name
// and up to 24 characters for the last name,
// and allowing hyphens, single quotes, spaces, tildes, backticks, and periods.
// See: https://community.developer.visa.com/t5/Implementation-API-Sample-Code/Credit-card-name-validation/td-p/11546
//
// NOTE: The regex pattern is working, but is not as good as it could be.
// Putting the hyphen inside the character class is throwing an error, even escaped, or at the
// beginning or end of the character class. Instead, a single hyphen is allowed in each name.
const visaNamePattern = "^([a-zA-Z' ~`.]+-?[a-zA-Z' ~`.]+){1,24} ([a-zA-Z' ~`.]+-?[a-zA-Z' ~`.]+){1,24}";

const visaOrMastercardNumberPattern =
  "^(?:4[0-9]{3} [0-9]{4} [0-9]{4} [0-9]{4})|(?:5[1-5][0-9]{2} [0-9]{4} [0-9]{4} [0-9]{4})$";


export default function PaymentForm({children, ...props}: PaymentFormProps): JSX.Element {
  const [paymentInfo, setPaymentInfo] = useState({
    [PaymentFormField.PaymentMethod]: 'creditCard',
    [PaymentFormField.CardName]: '',
    [PaymentFormField.CardNumber]: '',
    [PaymentFormField.CardExpiration]: '',
    [PaymentFormField.CardSecurityCode]: '',
  });

  function onExpireDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const expireDate = e.target.value;
    if (expireDate.length === 2) {
      e.target.value = expireDate + '/';
    }
    validateInput(e);
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
    props.callback({ fieldName: PaymentFormField.CardExpiration, value: e.target.value });
  }

  function onCardNumberChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cardNumber = e.target.value;
    if (cardNumber.length === 4 || cardNumber.length === 9 || cardNumber.length === 14) {
      e.target.value = cardNumber + ' ';
    } else if (cardNumber.match(/[0-9]{16}/)) {
      e.target.value =
        cardNumber.slice(0, 4) + ' ' +
        cardNumber.slice(4, 8) + ' ' +
        cardNumber.slice(8, 12) + ' ' +
        cardNumber.slice(12, 16);
    }
    validateInput(e);
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
    props.callback({ fieldName: PaymentFormField.CardNumber, value: e.target.value });
  }

  function onCardFieldChange(e: React.ChangeEvent<HTMLInputElement>) {
    validateInput(e);
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
    props.callback({ fieldName: getFieldName(e.target.name), value: e.target.value });
  }

  function onCardFieldBlur(e: React.FocusEvent<HTMLInputElement>) {
    validateInput(e);
    setPaymentInfo({
      ...paymentInfo,
      [e.target.name]: e.target.value,
    });
  }

  function validateInput(e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) {
    const validityState = e.target.validity;
    if (validityState.valueMissing ||
        validityState.tooShort ||
        validityState.tooLong ||
        validityState.patternMismatch) {
      e.target.style.border = errorBorder;
    } else {
      e.target.style.border = border;
    }
  }

  function onCardFieldFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.border = border;
  }

  return (
    <form className={props.formClassNames} action={props.action}>
      {children}
      <fieldset className={props.fieldSetClassNames} style={{display: props.showFields ? 'flex' : 'none'}}>
        <PaymentTextInput
          classNames={props.textFieldClassNames}
          id={PaymentFormField.CardName}
          label="Name on Card"
          name={PaymentFormField.CardName}
          type="text"
          placeholder="First Last"
          pattern={visaNamePattern}
          onChange={onCardFieldChange}
          onBlur={onCardFieldBlur}
          onFocus={onCardFieldFocus}
        />
        <PaymentTextInput
          classNames={props.textFieldClassNames}
          id={PaymentFormField.CardNumber}
          label="Card Number"
          name={PaymentFormField.CardNumber}
          type="tel"
          placeholder="#### #### #### ####"
          exactLength={19}
          pattern={visaOrMastercardNumberPattern}
          onChange={onCardNumberChange}
          onBlur={onCardFieldBlur}
          onFocus={onCardFieldFocus}
        />
        <PaymentTextInput
          classNames={props.textFieldClassNames}
          id={PaymentFormField.CardExpiration}
          label="Exp. Date"
          name={PaymentFormField.CardExpiration}
          type="tel"
          placeholder="MM/YY"
          exactLength={5}
          pattern="^(0[1-9]|1[0-2])\/[0-9]{2}$"
          onChange={onExpireDateChange}
          onBlur={onCardFieldBlur}
          onFocus={onCardFieldFocus}
        />
        <PaymentTextInput
          classNames={props.textFieldClassNames}
          id={PaymentFormField.CardSecurityCode}
          label="Security Code"
          name={PaymentFormField.CardSecurityCode}
          type="tel"
          placeholder="###"
          exactLength={3}
          pattern="^[0-9]{3}$"
          onChange={onCardFieldChange}
          onBlur={onCardFieldBlur}
          onFocus={onCardFieldFocus}
        />
      </fieldset>
    </form>
  )
}