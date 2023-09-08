import { createContext, useState } from "react";

const checkProductToAdd = (cartItems, productToAdd) => {
    const isProductExisted = cartItems.find(item => item.id === productToAdd.id);

    if (!isProductExisted) return [...cartItems, { ...productToAdd, quantity: 1 }];

    return cartItems.map(item => item.id === productToAdd.id ? { ...item, quantity: item.quantity + 1 } : item);

}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => { },
    cartItems: [],
    addItemToCart: () => { },
});

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCarItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCarItems(checkProductToAdd(cartItems, productToAdd));
    }

    const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart };

    return (<CartContext.Provider value={value}>{children}</CartContext.Provider>);
}