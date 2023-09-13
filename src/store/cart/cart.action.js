import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const checkProductToAdd = (cartItems, productToAdd) => {
  const isProductExisted = cartItems.find(
    (item) => item.id === productToAdd.id
  );

  if (!isProductExisted)
    return [...cartItems, { ...productToAdd, quantity: 1 }];

  return cartItems.map((item) =>
    item.id === productToAdd.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
};
const checkProductToRemove = (cartItems, productToRemove) => {
  const isProductExisted = cartItems.find(
    (item) => item.id === productToRemove.id
  );

  if (isProductExisted.quantity === 1)
    return cartItems.filter((item) => item.id !== productToRemove.id);

  return cartItems.map((item) =>
    item.id === productToRemove.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
const checkProductToClear = (cartItems, productToRemove) => {
  return cartItems.filter((item) => item.id !== productToRemove.id);
};

export const setIsCartOpen = (boolean) =>
  createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItem = checkProductToAdd(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem);
};

export const removeItemToCart = (cartItems, productToRemove) => {
  const newCartItem = checkProductToRemove(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem);
};

export const clearItemFromCart = (cartItems, productToClear) => {
  const newCartItem = checkProductToClear(cartItems, productToClear);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItem);
};
