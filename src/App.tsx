import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';
import { CartButton } from './components/cart-button';
import { Product } from './model/product';


const cartItems: Product[] = []

function App() {

  return (
    <>
      <CartButton
      cartItems={cartItems}
      /> 
      <ProductList
      products={products}
      >
      </ProductList>
    </>
  )
}

export default App
