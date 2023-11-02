import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';
import { CartButton } from './components/cart-button';
import { Product } from './model/product';
import { CartContext } from './contexts/cartContext';
import { useState } from 'react';


function App() {
  
  const [cartItems, setCartItems] = useState<Product[]>([])
  //render uno usereducer con tutte le funzioni del carrello: aggiunta, rimozione e modifica quantità
  //fare un hook per lo useReducer (es useCart) contenente il reducer e tutte le cose. Le ritorno e le passo al value del provider
  //cosicché il provider abbia tutte le funzioni a disposizione

  return (
    <>
    <CartContext.Provider value={{cartItems, setCartItems}}>

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
