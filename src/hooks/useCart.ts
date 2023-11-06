import { useReducer } from "react";
import { Product } from "../model/product";

enum CartActionType{
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity
}

type State = Product[]

type CartAction = 
{type: CartActionType.addToCart; product: Product}
| {type: CartActionType.removeFromCart; productId: number}
| {type: CartActionType.increaseQuantity}
| {type: CartActionType.decreaseQuantity}

function cartReducer(cart: State, action: CartAction):State{
    switch(action.type){
        case CartActionType.addToCart: {
            return [...cart, action.product]
        };
        case CartActionType.removeFromCart: {
            const filteredCart = cart.filter((product: Product) => product.id !== action.productId);
            return filteredCart;
        };
        case CartActionType.increaseQuantity:{
            return{

            }
        };
        case CartActionType.decreaseQuantity:{
            return{

            }
        }

        default: return cart
    }
}

const initialState: State = []

export type CartState = {
    actions: {
        addToCart: (product: Product) => void;
        removeFromCart: (productId: number) => void;
        increaseQuantity: () => void;
        decreaseQuantity: () => void;
    };
    cart: State;
}

export function useCart(): CartState {
    
    const [cart, dispatch] = useReducer(
        cartReducer, 
        initialState
    );

    const addToCart = (product:Product) => {
        dispatch({
        type: CartActionType.addToCart,
        product: product,
        })
    }

    const removeFromCart = (productId:number) => {
        dispatch({
            type: CartActionType.removeFromCart,
            productId,
        });
    }

    const increaseQuantity = () => {
        dispatch({type: CartActionType.increaseQuantity})
    }

    const decreaseQuantity = () => {
        dispatch({type: CartActionType.decreaseQuantity})
    }

    return {
        actions:{
            addToCart,
            removeFromCart,
            increaseQuantity,
            decreaseQuantity,
        },
        cart
    }
}