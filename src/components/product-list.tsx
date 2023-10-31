import { ReactNode } from "react"
import { Product } from "../model/product"
import { ProductCard } from "./product-card"

export interface ListProps{
    children: ReactNode,
    products: Product[],
}

export function ProductList(props:ListProps){
    return  (
    <div>
        <div >
            {props.products.map(product=>(
                <div className="card-container" key={product.id}>
                    <ProductCard 
                    product={product}/>

                </div>                   
            ))}
            
        </div>

    </div>
    )
}