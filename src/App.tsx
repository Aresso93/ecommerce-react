import { useState } from 'react';
import './App.css'
import products from '../store/products.json'
import { ProductList } from './components/product-list';
import { CartButton } from './components/cart-button';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


console.log(products);

const productsArray = products

function App() {

  return (
    <>
     <IconButton 
     color="primary" 
     aria-label="see shopping cart"
     onClick={() => 
      console.log('AAAA')

    }
     >
        <AddShoppingCartIcon />
    </IconButton>
        
      <ProductList
      products={products}
      >

      </ProductList>
    </>
  )
}

export default App
