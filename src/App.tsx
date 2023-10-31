import { useState } from 'react';
import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';
import { CartButton } from './components/cart-button';

console.log(products);

const productsArray = products

function App() {
  
  const [data,setData]=useState(
    
    []);

  return (
    <>
      <CartButton/>
        
      <ProductList
      products={products}
      >

      </ProductList>
    </>
  )
}

export default App
