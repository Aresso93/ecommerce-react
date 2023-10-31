import { Product } from "../model/product"

export interface ProductCardProps{
    product: Product,
}

export function ProductCard(props:ProductCardProps){
   
      return (
        <div className="product-card">
            <h2>{props.product.title}</h2>
            <span>Marca: {props.product.brand}</span>
            <span>{props.product.description}</span>
            <span>Attualmente scontato del {props.product.discountPercentage}%</span>
            <span>Tipo di prodotto: {props.product.category}</span>
            <span>Ancora {props.product.stock} a disposizione!</span>
            <img src={props.product.thumbnail} alt={props.product.title} />
        </div>
      )
   
    
}