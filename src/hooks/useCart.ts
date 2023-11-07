import { useReducer } from "react";
import { CartItem, Product } from "../model/product";

enum CartActionType{
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
}

type State = CartItem[]
type CartAction = 
{type: CartActionType.addToCart; product: Product}
| {type: CartActionType.removeFromCart; productId: number}
| {type: CartActionType.increaseQuantity, product: Product}
| {type: CartActionType.decreaseQuantity, product: Product}

function cartReducer(cart: State, action: CartAction):State{
    switch(action.type){
        case CartActionType.addToCart: {
            const newCartItem = {qty: 1, product: action.product}
            const foundItem = cart.find((cartItem) => cartItem.product.id === action.product.id);
            if (foundItem){
                return cart.map((cartItem)=> {
                   if (cartItem.product.id === action.product.id) {
                    return {product: action.product, qty: cartItem.qty+1}
                   }
                    return cartItem
                })
            }
            return [...cart, newCartItem]
        };

        case CartActionType.removeFromCart: {
            const filteredCart = cart.filter((cartItem: CartItem) => cartItem.product.id !== action.productId);
            console.log(action.productId);
            return filteredCart;
        };

        case CartActionType.increaseQuantity:{  
            const foundItem = cart.find((cartItem) => cartItem.product.id === action.product.id); 
            if (foundItem){
                return cart.map((cartItem)=> {
                    if (cartItem.product.id === action.product.id) {
                     return {product: action.product, qty: cartItem.qty+1}
                    }
                     return cartItem
                 })
            }
            console.log(cart)
            return cart
        };

        case CartActionType.decreaseQuantity:{
            const foundItem = cart.find((cartItem) => cartItem.product.id === action.product.id);
            
            if(foundItem?.qty === 1){
                return cart.filter((cartItem: CartItem) => cartItem.product.id !== action.product.id);
            }
            
            if (foundItem){
                return cart.map((cartItem)=> {
                    if (cartItem.product.id === action.product.id) {
                     return {product: action.product, qty: cartItem.qty-1}
                    }
                     return cartItem
                 })
            }
            return cart
        };
        default: return cart
    }
}
const initialState: State = []
export type CartState = {
    actions: {
        addToCart: (product: Product) => void;
        removeFromCart: (productId: number) => void;
        increaseQuantity: (product: Product) => void;
        decreaseQuantity: (product: Product) => void;
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

    const increaseQuantity = (product: Product) => {
        dispatch({
            type: CartActionType.increaseQuantity,
            product: product
        })
    }
    const decreaseQuantity = (product: Product) => {
        dispatch({
            type: CartActionType.decreaseQuantity,
            product: product
        })
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