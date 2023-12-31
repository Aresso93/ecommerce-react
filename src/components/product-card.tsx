import { IconButton } from "@mui/material";
import { useCartContext } from "../contexts/cartContext";
import { Product } from "../model/product"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export interface ProductCardProps{
    product: Product,
}

export function ProductCard(props:ProductCardProps){
    const cartContext = useCartContext();
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
            <div className="button-container">
                add to cart
                <IconButton
                color="primary"
                aria-label="delete"
                onClick={() =>
                cartContext.actions.addToCart(props.product)
                }
                >
                <AddShoppingCartIcon 
                color="primary"
                fontSize="medium"
                />
                </IconButton>
            </div>
        </div>
      )
   
    
}