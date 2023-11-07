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
| {type: CartActionType.increaseQuantity, cartItem: CartItem}
| {type: CartActionType.decreaseQuantity, productQuantity: number}

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
            const foundItem = cart.find((cartItem) => cartItem.product.id === action.cartItem.product.id);
            if (foundItem){
                return cart.map((cartItem)=> {
                   if (cartItem.product.id === action.cartItem.product.id) {
                    return {product: action.cartItem.product, qty: cartItem.qty+1}
                   }
                    return cartItem
                })
            }
            return cart
            
        };
        case CartActionType.decreaseQuantity:{
            const newQuantity = action.productQuantity+1
            return newQuantity
        };

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
        calculateTotalItems: () => void;
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

    const increaseQuantity = (cartItem:CartItem) => {
        dispatch({
            type: CartActionType.increaseQuantity,
            cartItem: cartItem
        })
    }

    const decreaseQuantity = (productQuantity:number) => {
        dispatch({
            type: CartActionType.decreaseQuantity,
            productQuantity
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