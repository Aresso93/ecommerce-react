import { createContext, useContext } from "react";
import { Product } from "../model/product";

export const CartContext = createContext<Product[]>([])

export const useCartContext = () => useContext(CartContext)
