import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';
import { CartButton } from './components/cart-button';
import { Product } from './model/product';
import { CartContext } from './contexts/cartContext';
import { useState } from 'react';
import { useCart } from './hooks/useCart';


function App() {
  
  const cartState = useCart()

  return (
    <>
    <CartContext.Provider value={cartState}>

      <CartButton
      /> 
      <ProductList
      products={products}
      />
     
    </CartContext.Provider>
    </>
  )
}

export default App
