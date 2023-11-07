import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';
import { CartButton } from './components/cart-button';
import { CartContext } from './contexts/cartContext';
import { useCart } from './hooks/useCart';
import Header from './components/header';

function App() {
  
  const cartState = useCart()

  return (
    <>
    <CartContext.Provider value={cartState}>
      <Header/>
      <CartButton/> 
      <ProductList
      products={products}
      />
     
    </CartContext.Provider>
    </>
  )
}

export default App
