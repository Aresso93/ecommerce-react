import { createContext, useContext } from "react";
import { Product } from "../model/product";

const initialState = {cartItems: [], setCartItems: () => {} }
export const CartContext = createContext<{cartItems:Product[], setCartItems:React.Dispatch<React.SetStateAction<Product[]>>}>(initialState)

export const useCartContext = () => useContext(CartContext)