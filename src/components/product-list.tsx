import { ReactNode } from "react"
import { Product } from "../model/product"
import { ProductCard } from "./product-card"
import { useCartActions } from "../hooks/useCartActions"

export interface ListProps{
    children: ReactNode,
    products: Product[],
}

export function ProductList(props:ListProps){

    const cartActions = useCartActions()

    return  (
    <div className="outer-container">
        {props.products.map(product=>(
            <div className="card-container" key={product.id}>
                    <ProductCard 
                    product={product}
                    addToCart={console.log('banana')} 
                    />
            </div>                   
            ))}
    </div>
    )
}