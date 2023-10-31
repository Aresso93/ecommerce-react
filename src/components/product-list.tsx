import { ReactNode } from "react"
import { Product } from "../model/product"
import { ProductCard } from "./product-card"

export interface ListProps{
    children: ReactNode,
    products: Product[]
}

export function ProductList(props:ListProps){
    return  <>
        <div>
            <ul>
                {props.products.map(product=>(
                    <li>
                        <ProductCard 
                        product={product}/>

                    </li>                   
                ))}
            </ul>
        </div>
    </>
}