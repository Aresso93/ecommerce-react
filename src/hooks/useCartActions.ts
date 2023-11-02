import { useState } from "react";
import { Product } from "../model/product";

export function useCartActions(){
    
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = (product: Product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

      return {
        actions:
        {
            addToCart
        },
        state: cart
      }

}
