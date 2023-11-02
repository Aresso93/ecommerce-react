import { useState } from "react";
import { Product } from "../model/product";

export function useCartActions(){
    
    const [cart, setCart] = useState<Product[]>([])

    const addToCart = (product: Product) => {
        const newCart = [...cart, product];
        setCart(newCart);
    }

    // function addToCart(product: Product){
    //     const found = cartItems.find(item => item.id === product.id);
    //     if (!found) {
    //       cartItems.push(product)
    //     }
    //   }


      return {
        actions:
        {
            addToCart
        },
        state: cart
      }

}
