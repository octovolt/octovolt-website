import { createContext } from 'react';

import { CartActionPayload, CartSelection } from './cartReducer';

export const CartContext = createContext<CartSelection[]>([] as CartSelection[]);

export const CartDispatchContext = createContext<(payload: CartActionPayload) => void>(({type: symbol}) => {});