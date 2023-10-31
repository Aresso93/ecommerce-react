import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export interface CartButtonProps{
    
}


export function CartButton() {
    return (
    <IconButton color="primary" aria-label="add to shopping cart">
        <AddShoppingCartIcon />
    </IconButton>
    )
  }