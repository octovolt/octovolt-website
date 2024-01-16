import React from "react";

import TextInput from "@/app/components/textInput";

import { useState } from "react";
import { fedexCountries, countryProvinces } from "@/lib/fedex";

import formStyles from "@/styles/form.module.css";

export enum AddressFormField {
  Name = "name",
  Country = "country",
  Address = "address",
  City = "city",
  Province = "province",
  PostalCode = "postalCode",
};

function getFieldName(name: string): AddressFormField {
  switch (name) {
    case "name":
      return AddressFormField.Name;
    case "country":
      return AddressFormField.Country;
    case "address":
      return AddressFormField.Address;
    case "city":
      return AddressFormField.City;
    case "province":
      return AddressFormField.Province;
    case "postalCode":
      return AddressFormField.PostalCode;
    default:
      throw new Error(`Invalid field name: ${name}`);
  }
}

interface AddressFormProps {
  action?: string,
  disabled?: boolean,
  fieldSetClassNames: string,
  formClassNames: string,
  showFields?: boolean,
  textFieldClassNames: string,
  callback: (fieldData: {fieldName: AddressFormField, value: string}) => void,
};

const AddressTextInput = TextInput<AddressFormField>;

const placeholder = '--';
const border = '1px solid #888';
const errorBorder = '1px solid #f00';

export default function AddressForm({
  children,
  action = "",
  disabled = false,
  fieldSetClassNames,
  formClassNames,
  showFields = true,
  textFieldClassNames,
  callback,
}: React.PropsWithChildren<AddressFormProps>): JSX.Element {
  const [country, setCountry] = useState({ name: placeholder, code: placeholder });
  const [provinceRequired, setProvinceRequired] = useState(false);

  function onCountryChange(e: React.ChangeEvent<HTMLSelectElement>): void  {
    setCountry(fedexCountries.find((country) => {
      return country.code === e.target.value;
    }) || { name: placeholder, code: placeholder });
    const provinceRequired = countryProvinces.find((countryProvince) => countryProvince.code === e.target.value);
    setProvinceRequired(!!provinceRequired);
    e.target.style.border = e.target.value === placeholder ? errorBorder : border;
    callback({ fieldName: AddressFormField.Country, value: e.target.value });
  };

  function onProvinceChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    e.target.style.border = e.target.value === placeholder ? errorBorder : border;
    callback({ fieldName: AddressFormField.Province, value: e.target.value });
  };

  function onSelectBlur(e: React.FocusEvent<HTMLSelectElement>): void {
    const selectElement = e.target as HTMLSelectElement;
    selectElement.style.border =
      selectElement.value === placeholder || selectElement.value === ''
        ? errorBorder
        : border;
  }

  function onTextFieldChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const validityState = e.target.validity;
    if (validityState.valueMissing || validityState.tooShort || validityState.tooLong || validityState.patternMismatch) {
      e.target.style.border = errorBorder;
    } else {
      e.target.style.border = border;
    }
    callback({ fieldName: getFieldName(e.target.name), value: e.target.value });
  };

  function onTextFieldBlur(e: React.FocusEvent<HTMLInputElement>) {
    const validityState = e.target.validity;
    if (validityState.valueMissing || validityState.tooShort || validityState.tooLong || validityState.patternMismatch) {
      e.target.style.border = errorBorder;
    } else {
      e.target.style.border = border;
    }
  }

  function onTextFieldFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.style.border = border;
  };

  const countryOptions: JSX.Element[] = fedexCountries.map((country): JSX.Element => {
    if (country.status === "suspended") {
      return (
        <option key={country.code} value={country.code} disabled>{country.name}</option>
      );
    }
    return (
      <option key={country.code} value={country.code}>{country.name}</option>
    );
  });

  return (
    <form className={formClassNames} action={action}>
      {children}
      {showFields && (
        <fieldset className={fieldSetClassNames}>
          <div className={formStyles.fieldgroup}>
            <AddressTextInput
              classNames={textFieldClassNames}
              id={AddressFormField.Name}
              label="Name"
              name={AddressFormField.Name}
              type="text"
              disabled={disabled}
              placeholder="Name"
              onBlur={onTextFieldBlur}
              onChange={onTextFieldChange}
              onFocus={onTextFieldFocus}
            />
          </div>
          <div className={formStyles.fieldgroup + ' ' + formStyles.selectFieldgroup}>
            <label htmlFor="country">Country</label>
            <select
              required
              disabled={disabled}
              className={textFieldClassNames + ' ' + formStyles.select}
              id={AddressFormField.Country}
              name={AddressFormField.Country}
              aria-label="Country"
              aria-required="true"
              onChange={onCountryChange}
              onBlur={onSelectBlur}>
              <option value="">--</option>
              {countryOptions}
            </select>
          </div>
          <div className={formStyles.fieldgroup}>
            <AddressTextInput
              classNames={textFieldClassNames}
              id={AddressFormField.Address}
              label="Address"
              name={AddressFormField.Address}
              type="text"
              disabled={disabled}
              placeholder="Address"
              onBlur={onTextFieldBlur}
              onChange={onTextFieldChange}
              onFocus={onTextFieldFocus}
            />
          </div>
          <div className={formStyles.fieldgroup}>
            <AddressTextInput
              classNames={textFieldClassNames}
              id={AddressFormField.City}
              label="City"
              name={AddressFormField.City}
              type="text"
              disabled={disabled}
              placeholder="City"
              onBlur={onTextFieldBlur}
              onChange={onTextFieldChange}
              onFocus={onTextFieldFocus}
            />
          </div>
          {provinceRequired && (
            <div className={formStyles.fieldgroup + ' ' + formStyles.selectFieldgroup}>
              <label htmlFor="province">State / Province</label>
              <select
                required={provinceRequired}
                disabled={disabled}
                className={textFieldClassNames + ' ' + formStyles.select}
                id={AddressFormField.Province}
                name={AddressFormField.Province}
                aria-label="State or Province"
                aria-required="true"
                onBlur={onSelectBlur}
                onChange={onProvinceChange}>
                <option value="">--</option>
                {
                  countryProvinces
                    .find((provinceOrientedCountry) => provinceOrientedCountry.name === country.name)
                    ?.provinces.map((countryProvince) => {
                      return (
                        <option key={countryProvince.code} value={countryProvince.code}>{countryProvince.name}</option>
                      );
                    }
                )}
              </select>
            </div>
          )}
          <div className={formStyles.fieldgroup}>
            <AddressTextInput
              classNames={textFieldClassNames}
              id={AddressFormField.PostalCode}
              label="Postal Code"
              name={AddressFormField.PostalCode}
              type="text"
              disabled={disabled}
              placeholder="Postal Code"
              onBlur={onTextFieldBlur}
              onChange={onTextFieldChange}
              onFocus={onTextFieldFocus}
            />
          </div>
        </fieldset>
      )}
    </form>
  );
}
