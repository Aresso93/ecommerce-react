import { Product } from "../model/product"

export interface ProductCardProps{
    product: Product,
}

export function ProductCard(props:ProductCardProps){
   
      return (
        <div className="product-card" >
            <h3>{props.product.title}</h3>
            <span>Brand: {props.product.brand}</span>
            <div className="product-description">
                {props.product.description}
            </div>
            <span>Only {props.product.price} gold pieces ({props.product.discountPercentage}% discount)!</span>
            <span>Product type: {props.product.category}</span>
            <span>Only {props.product.stock} left!</span>
            <img src={props.product.thumbnail} alt={props.product.title} />
            <button 
            className="card-button"
            onClick={()=>
            console.log(props.product.id)}
            >
                + add to cart
            </button>
        </div>
      )
   
    
}