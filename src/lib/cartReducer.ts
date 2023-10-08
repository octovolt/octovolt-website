// Cart.ts

import { useReducer, useEffect } from 'react';

import { useLocalStorage, getStoredValue } from './useLocalStorage.js';

// CartSelection is the type of a single item in the cart
export interface CartSelection {
  name: string,
  option: string,
  price: number,
}

// CartActionPayload is the union of all possible action payloads
export type CartActionPayload =
  CartActionPayloadAddition |
  CartActionPayloadAdjustment |
  CartActionPayloadMinimal |
  CartActionPayloadReplacement;

export interface CartActionPayloadMinimal {
  type: symbol,
};

export interface CartActionPayloadAdjustment {
  type: symbol,
  name: string,
  option: string,
};

export interface CartActionPayloadAddition {
  type: symbol,
  amount: number,
  selection: CartSelection,
};

export interface CartActionPayloadReplacement {
  type: symbol,
  cart: CartSelection[],
};

// Action types
export const CartActions = Object.freeze({
    ADDED: Symbol("ADDED"),
    DECREMENTED: Symbol("DECREMENTED"),
    INCREMENTED: Symbol("INCREMENTED"),
    REMOVED: Symbol("REMOVED"),
    REPLACED: Symbol("REPLACED"),
});

/**
 * getStoredCart()
 *
 * Retrieves the stored cart data directly
 * from localStorage. This does not involve the React state
 * or reducers in any way, but is a direct retrieval from storage.
 *
 * IMPORTANT: this needs to be called within useEffect()
 * because window.localStorage does not exist on the server.
 *
 * Note also that this may return an empty arry rather than
 * the actual stored cart, if the stored cart cannot be
 * retrieved or is null for any reason, such as server side code
 * or blank slate initialization.
 *
 * This function is intended to be used only during the initial
 * client initialization, not as a general getter function.
 */
export function getStoredCart() {
  return getStoredValue('cart', [] as CartSelection[]);
}

/**
 * initializeCartReducer()
 *
 * Creates a reducer and sets up the client side initialization.
 *
 * This is intended to be called only once on page load, within _app.js.
 *
 * Note that this is not a custom hook, as we do not want to call this
 * function repeatedly.
 *
 * !!! IMPORTANT !!!
 * Each action case in the reducer must modify the cart by assigning a copy of
 * the cart array to it. If we directly mutate the cart, the reference to the
 * cart will not change, and within useLocalStorage the effect that writes
 * to localStorage will not be called.
 */
export function useCartReducer(): [
  CartSelection[],
  React.Dispatch<CartActionPayload>
] {
  const [storedCart, setStoredCart] = useLocalStorage('cart', [] as CartSelection[]);

  const cartReducer = (cart: CartSelection[], action: CartActionPayload) => {
    if (action?.type) {
      switch (action.type) {

        // Add the specified number of selected items to the cart
        case CartActions.ADDED: {
          if ('amount' in action && 'selection' in action) {
            let amount = action.amount;
            const items = [] as CartSelection[];
            while (amount > 0) {
              items.push({
                name: action.selection.name,
                option: action.selection.option,
                price: action.selection.price,
              });
              --amount;
            }
            cart = cart.concat(items);
          } else {
            throw Error('Invalid payload for action type: ' + action.type.toString());
          }
          break;
        }

        // Reduce the number of a specific selected item in the cart by one
        case CartActions.DECREMENTED: {
          if ('name' in action && 'option' in action) {
            const idx = cart.findIndex((item) => {
              return item.name === action.name && item.option === action.option;
            });
            if (idx < 0) {
              return cart;
            }
            const updatedCart = [...cart];
            updatedCart.splice(idx, 1);
            cart = updatedCart;
          } else {
            throw Error('Invalid payload for action type: ' + action.type.toString());
          }
          break;
        }

        // Increase the number of a specific selected item in the cart by one
        case CartActions.INCREMENTED: {
          if ('name' in action && 'option' in action) {
            const idx = cart.findIndex((item) => {
              return item.name === action.name && item.option === action.option;
            });
            if (idx < 0) {
              return cart;
            }
            cart = [...cart, cart[idx]];
          } else {
            throw Error('Invalid payload for action type: ' + action.type.toString());
          }
          break;
        }

        // Remove all items from the cart
        case CartActions.REMOVED: {
          cart = [];
          break;
        }

        // Replace the cart with the specified cart
        case CartActions.REPLACED: {
          if ('cart' in action) {
            cart = action.cart;
          } else {
            throw Error('Invalid payload for action type: ' + action.type.toString());
          }
          break;
        }

        default: {
          throw Error('Unknown action: ' + action.type.toString());
        }
      }
      setStoredCart(cart);
    }
    return cart;
  };

  const [cart, dispatch] = useReducer(
    cartReducer,
    [],
  );

  // Client side reinitialization of cart
  useEffect(() => {
    const storedCart = getStoredCart();
    if (cart && storedCart && cart.length !== storedCart.length) {
      dispatch({
        type: CartActions.REPLACED,
        cart: storedCart,
      });
    }
  }, []);

  return [cart, dispatch];
};