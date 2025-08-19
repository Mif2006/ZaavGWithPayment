// lib/cart.utils.ts
export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    size?: string;
    image?: string;
  }
  
  export const addToCart = (item: Omit<CartItem, 'id'> & { id?: string }) => {
    try {
      // Generate a unique ID if not provided
      const itemId = item.id || `${item.name}-${item.size || 'nosize'}-${Date.now()}`;
      
      // Get existing cart
      const storedCart = localStorage.getItem('cart');
      let cartItems: CartItem[] = [];
      
      // Parse existing cart or initialize empty array
      if (storedCart) {
        try {
          const parsedCart = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) {
            cartItems = parsedCart;
          }
        } catch (parseError) {
          console.error('Error parsing cart ', parseError);
          cartItems = []; // Reset to empty array if parsing fails
        }
      }
      
      // Check if item already exists in cart
      const existingItemIndex = cartItems.findIndex(
        cartItem => cartItem.id === itemId
      );
      
      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        cartItems[existingItemIndex].quantity += item.quantity || 1;
      } else {
        // Add new item
        cartItems.push({
          ...item,
          id: itemId,
          quantity: item.quantity || 1
        } as CartItem);
      }
      
      // Save updated cart
      localStorage.setItem('cart', JSON.stringify(cartItems));
      
      return true;
    } catch (error) {
      console.error('Error adding to cart:', error);
      return false;
    }
  };
  
  export const getCartItems = (): CartItem[] => {
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          return parsedCart;
        }
      }
      return [];
    } catch (error) {
      console.error('Error getting cart items:', error);
      return [];
    }
  };
  
  export const clearCart = () => {
    try {
      localStorage.removeItem('cart');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  
  export const removeFromCart = (itemId: string) => {
    try {
      const cartItems = getCartItems();
      const updatedCart = cartItems.filter(item => item.id !== itemId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    } catch (error) {
      console.error('Error removing from cart:', error);
      return getCartItems();
    }
  };
  
  export const updateCartItemQuantity = (itemId: string, quantity: number) => {
    try {
      if (quantity < 1) {
        return removeFromCart(itemId);
      }
      
      const cartItems = getCartItems();
      const updatedCart = cartItems.map(item => 
        item.id === itemId ? { ...item, quantity } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      return getCartItems();
    }
  };