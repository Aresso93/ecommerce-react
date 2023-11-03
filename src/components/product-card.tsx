import { useCartContext } from "../contexts/cartContext";
import { useCart } from "../hooks/useCart";
import { Product } from "../model/product"

export interface ProductCardProps{
    product: Product,
}

export function ProductCard(props:ProductCardProps){
    //const cartContext = useCartContext();
    const cartActions = useCart()
      return (
        <div className="product-card" >
            <h3>{props.product.title}</h3>
            <span>Brand: {props.product.brand}</span>
            <div className="product-description">
                {props.product.description}
            </div>
            <span>Only {props.product.price} gold coins ({props.product.discountPercentage}% discount)!</span>
            <span>Product type: {props.product.category}</span>
            <span>Only {props.product.stock} left!</span>
            <img src={props.product.thumbnail} alt={props.product.title} />
            <button 
            className="card-button"
            onClick={()=>{
                //cartContext.setCartItems([...cartContext.cartItems, props.product])
                cartActions.addToCart(props.product)
            }}
            >
                + add to cart
            </button>
        </div>
      )
   
    
}