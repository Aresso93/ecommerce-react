import { useState } from 'react';
import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';

console.log(products);

const productsArray = products

function App() {
  
  const [data,setData]=useState(
    
    []);

  return (
    <>
      <ProductList
      products={products}
      >

      </ProductList>
    </>
  )
}

export default App
