import { CartItem, MenuItem } from "@/types/menu";
import createContextHook from "@nkzw/create-context-hook";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export const [CartProvider, useCart] = createContextHook(() => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem("cart");
        if (cartData) {
          setItems(JSON.parse(cartData));
        }
      } catch (err) {
        console.error("Failed to load cart data:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, []);

  const saveCart = async (cartItems: CartItem[]) => {
    try {
      await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
    } catch (err) {
      console.error("Failed to save cart:", err);
    }
  };

  const addToCart = (item: MenuItem, quantity: number = 1) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(i => i.item.id === item.id);
      
      let newItems;
      if (existingItem) {
        newItems = prevItems.map(i => 
          i.item.id === item.id 
            ? { ...i, quantity: i.quantity + quantity } 
            : i
        );
      } else {
        newItems = [...prevItems, { item, quantity }];
      }
      
      saveCart(newItems);
      return newItems;
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(i => i.item.id !== itemId);
      saveCart(newItems);
      return newItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setItems(prevItems => {
      const newItems = prevItems.map(i => 
        i.item.id === itemId ? { ...i, quantity } : i
      );
      saveCart(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    saveCart([]);
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + (item.item.price * item.quantity), 0);
  };

  return {
    items,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
  };
});