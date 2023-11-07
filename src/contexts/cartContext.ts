import { createContext, useContext } from "react";
import { CartState } from "../hooks/useCart";

const initialState = {
    actions: {
        addToCart: () => {},
        removeFromCart: () => {},
        increaseQuantity: () => {},
        decreaseQuantity: () => {},
    },
    cart: [],
}
export const CartContext = createContext<CartState>(initialState)

export const useCartContext = () => useContext(CartContext)