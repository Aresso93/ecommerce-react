import { useReducer } from "react";
import { Product } from "../model/product";

function cartReducer(state, action){

    switch(action.type){
        case 'add_to_cart': {
            state.cart.push(action.product);
            return state;
        };
        case 'remove_from_cart': {
            state.cart.filter((product: Product) => product.id !== action.id);
            return state;
        };
        case 'increase_item_quantity':{
            return{

            }
        };
        case 'decrease_item_quantity':{
            return{

            }
        }
    }
    
}

export function useCart() {
    
    const [state, dispatch] = useReducer(
        cartReducer, 
        {cart: []}
    );

    const addToCart = (product:Product) => {
        dispatch({
        type: 'add_to_cart',
        product: product,
        })
    }

    const removeFromCart = (productId:number) => {
        dispatch({
            type: 'remove_from_cart',
            productId
        });
    }

    const increaseQuantity = () => {
        dispatch({type: 'increase_item_quantity'})
    }

    const decreaseQuantity = () => {
        dispatch({type: 'decrease_item_quantity'})
    }

    return {
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity
    }
}