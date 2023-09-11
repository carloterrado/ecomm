import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";


const checkProductToAdd = (cartItems, productToAdd) => {
    const isProductExisted = cartItems.find(item => item.id === productToAdd.id);

    if (!isProductExisted) return [...cartItems, { ...productToAdd, quantity: 1 }];

    return cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);

}
const checkProductToRemove = (cartItems, productToRemove) => {
    const isProductExisted = cartItems.find(item => item.id === productToRemove.id);

    if (isProductExisted.quantity === 1) return cartItems.filter(item => item.id !== productToRemove.id);

    return cartItems.map(item => item.id === productToRemove.id ? { ...item, quantity: item.quantity - 1 } : item);

}
const checkProductToClear = (cartItems, productToRemove) => {
    return cartItems.filter(item => item.id !== productToRemove.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
    removeItemToCart: () => { },
    clearItemFromCart: () => { },
    cartCount: 0,
    totalCount: 0,
});

export const CART_ACTION_TYPES = {
    SET_CART_ITEMS: "SET_CART_ITEMS",
    SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
}

const cartReducer = (state, action) => {
    const { type, payload } = action;
   


    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error(`Invalid action types: ${type} from Cart Reducer`)
    }
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    totalCount: 0,
}

export const CartProvider = ({ children }) => {


    const [{ isCartOpen, cartItems, cartCount, totalCount }, dispatch] = useReducer(cartReducer, INITIAL_STATE);


    const updateCartItemsReducer = (newCartItems) => {
        const newCount = newCartItems.reduce((totalQty, item) => totalQty + item.quantity, 0)

        const newTotal = newCartItems.reduce((totalQty, item) => totalQty + (item.quantity * item.price), 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, { cartItems: newCartItems, cartCount: newCount, totalCount: newTotal }))
    }

    const setIsCartOpen = (isCartOpen) => dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));


    const addItemToCart = (productToAdd) => {
        const newCartItem = checkProductToAdd(cartItems, productToAdd);
        updateCartItemsReducer(newCartItem);
    };

    const removeItemToCart = (productToRemove) => {
        const newCartItem = checkProductToRemove(cartItems, productToRemove);
        updateCartItemsReducer(newCartItem);
    };

    const clearItemFromCart = (productToClear) => {
        const newCartItem = checkProductToClear(cartItems, productToClear);
        updateCartItemsReducer(newCartItem);
    };

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemToCart, cartCount, clearItemFromCart, totalCount };

    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
}