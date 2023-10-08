import React from "react";

import { AddressFormField } from "./addressForm";
import { PaymentFormField } from "./paymentForm";

interface TextInputProps<FieldType extends AddressFormField | PaymentFormField> {
  classNames: string,
  id: FieldType,
  label: string,
  name: FieldType,
  type: string,
  disabled?: boolean,
  placeholder?: string,
  exactLength?: number,
  minLength?: number,
  maxLength?: number,
  pattern?: string,
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void,
  onInput?: (e: React.FormEvent<HTMLInputElement>) => void,
};

export default function TextInput<FieldType extends AddressFormField | PaymentFormField>({
  ...props
}: TextInputProps<FieldType>): JSX.Element {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        required
        disabled={props.disabled}
        className={props.classNames}
        type={props.type}
        id={props.id}
        name={props.name}
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
        aria-label={props.label}
        aria-required="true"
        placeholder={props.placeholder}
        minLength={props.minLength ? props.minLength : props.exactLength}
        maxLength={props.maxLength ? props.maxLength : props.exactLength}
        pattern={props.pattern}
        onBlur={props.onBlur}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onInput={props.onInput}
      />
    </>
  );
}