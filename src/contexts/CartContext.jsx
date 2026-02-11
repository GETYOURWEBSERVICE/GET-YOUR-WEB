import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('gyw_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('gyw_cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            // Check if item already in cart
            const exists = prevCart.find(item => item.id === product.id || (item.name === product.name && item.price === product.price));
            if (exists) {
                alert(`${product.name || product.title} is already in your cart!`);
                return prevCart;
            }
            return [...prevCart, product];
        });
    };

    const removeFromCart = (productId, productName) => {
        setCart((prevCart) => prevCart.filter(item => {
            if (item.id) return item.id !== productId;
            return item.name !== productName;
        }));
    };

    const clearCart = () => {
        setCart([]);
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price || item.cost || 0), 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
            {children}
        </CartContext.Provider>
    );
};
