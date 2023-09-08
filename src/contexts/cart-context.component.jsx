import { createContext, useEffect, useState } from "react";

const checkProductToAdd = (cartItems, productToAdd) => {
    const isProductExisted = cartItems.find(item => item.id === productToAdd.id);

    if (!isProductExisted) return [...cartItems, { ...productToAdd, quantity: 1 }];

    return cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);

}
const checkProductToRemove = (cartItems, productToRemove) => {
    const isProductExisted = cartItems.find(item => item.id === productToRemove.id);
 
    if (isProductExisted.quantity === 1)  return cartItems.filter(item => item.id !== productToRemove.id);
    
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
    clearItemFromCart: () => {},
    cartCount: 0,
    totalCount: 0,
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCarItems] = useState([]);
    const [cartCount, setCartCount] = useState(0)
    const [totalCount, setTotalCount] = useState(0)

    useEffect(() => {
        const newCount = cartItems.reduce((totalQty, item) => totalQty + item.quantity, 0)
        setCartCount(newCount);
    }, [cartItems])

    useEffect(() => {
        const newTotal = cartItems.reduce((totalQty, item) => totalQty + (item.quantity * item.price), 0)
        setTotalCount(newTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => setCarItems(checkProductToAdd(cartItems, productToAdd));
    
    const removeItemToCart = (productToRemove) => setCarItems(checkProductToRemove(cartItems, productToRemove));
    
    const clearItemFromCart = (productToClear) => setCarItems(checkProductToClear(cartItems, productToClear));

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemToCart, cartCount, clearItemFromCart, totalCount };

    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
}