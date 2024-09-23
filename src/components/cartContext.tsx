'use client'; // Ensure this is treated as client-side

import { Product } from '@/types/type';
import { createContext, useState, useContext, useEffect, ReactNode } from 'react';



interface CartContextType {
  cart: Product[];
  addToCart: (item: Product) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  updateCartItem: (updatedItem: Product) => void;
  updateCartItemQuantity: (id: string, quantity: number) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
   // Initialize the cart from localStorage
   const [cart, setCart] = useState<Product[]>(() => {
      if (typeof window !== 'undefined' && window.localStorage) {
        const storedCart = localStorage.getItem('cart');
        return storedCart ? JSON.parse(storedCart) : [];
      }
      return [];
    });
  

  // Update localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Add an item to the cart
  const addToCart = (item: Product) => {
    setCart([...cart, item]);
  };

  const updateCartItem = (updatedItem: Product) => {
   setCart(cart.map(item => (item.id === updatedItem.id ? updatedItem : item)));
 };

 const updateCartItemQuantity = (id: string, quantity: number) => {
   setCart(cart.map(item => 
     item.id === id ? { ...item, quantity: item.quantity + quantity } : item
   ));
 };

  // Remove an item from the cart by its ID
  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  // Clear all items from the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateCartItem, updateCartItemQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext with error handling
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
