import { Product } from "../model/product"
import { ProductCard } from "./product-card"

export interface ListProps{
    products: Product[],
}

export function ProductList(props:ListProps){

    return  (
    <div className="outer-container">
        {props.products.map(product=>(
            <div className="card-container" key={product.id}>
                <ProductCard 
                product={product}
                />
            </div>                   
            ))}
    </div>
    )
}