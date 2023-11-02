import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';
import { CartButton } from './components/cart-button';
import { Product } from './model/product';
import { CartContext } from './contexts/cartContext';

const cartItems: Product[] = []

function App() {

  return (
    <>
    <CartContext.Provider value={cartItems}>

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
