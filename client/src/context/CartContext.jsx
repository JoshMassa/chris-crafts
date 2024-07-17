import React, { createContext, useContext, useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from '@apollo/client';
import { GET_CART } from '../utils/queries.js';
import { ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART } from '../utils/mutations.js';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export function CartProvider({ children }) {
    const { user, isLoggedIn } = useAuth();
    const [cart, setCart] = useState([]);
    const userId = isLoggedIn ? user._id : null;

    const { data, refetch } = useQuery(GET_CART, {
        variables: { userId },
        skip: !isLoggedIn,
        onCompleted: (data) => {
            if (data && data.getCart) {
                setCart(data.getCart.items);
                }
            },
        });

    useEffect(() => {
        if (isLoggedIn) {
            refetch();
        } else {
            setCart([]);
        }
    }, [isLoggedIn, refetch]);

    const [addItemToCart] = useMutation(ADD_ITEM_TO_CART);
    const [removeItemFromCart] = useMutation(REMOVE_ITEM_FROM_CART);

    const addToCart = async (product) => {
        try {
            const { data } = await addItemToCart({
                variables: { 
                    userId,
                    productId: product.productId,
                    quantity: 1,
                },
            });
            
            if (data && data.addItemToCart) {
                setCart(data.addItemToCart.items);
            }
            
            console.log('Product', product)

        } catch (error) {
            console.error('Error adding item to cart:', error.message);
        }
    };

    const removeFromCart = async (product) => {
        try {
            const { data } = await removeItemFromCart({
                variables: { 
                    userId,
                    productId: product.productId,
                    quantity: 1,
                },
            });

            if (data && data.removeItemFromCart) {
                setCart(data.removeItemFromCart.items);
            }
        } catch (error) {
            console.error('Error removing item from the cart:', error.message);
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
  return useContext(CartContext);
}
