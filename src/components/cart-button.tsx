import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCartContext } from '../contexts/cartContext';
import { useCart } from '../hooks/useCart';

  export function CartButton() {
      const cartActions = useCart()
      const cartContext = useCartContext()
      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
          setOpen(true);
        };
        const handleClose = () => {
            setOpen(false);
        };
        const descriptionElementRef = React.useRef<HTMLElement>(null);
        React.useEffect(() => {
            if (open) {
                const { current: descriptionElement } = descriptionElementRef;
                if (descriptionElement !== null) {
                    descriptionElement.focus();
                }
            }
        }, [open]);

      return (
        <div className='cart-controls-container'>
            <div className='cart-controls'>
            Open your cart ({cartContext.cartItems.length} products in cart)
            <IconButton 
                color="primary" 
                aria-label="add to shopping cart"
                onClick={handleClickOpen}
                >
                <AddShoppingCartIcon />
            </IconButton>
            <Dialog
            open={open}
            onClose={handleClose}
            scroll={'body'}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Your cart</DialogTitle>
                <DialogContent>
                <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                >
            These are the products you currently have in your cart:
          </DialogContentText>
          {
            <div className='cart'>
                {cartContext.cartItems.map(product=>(
                    <div className='cart-content' key={product.id}>
                        <div className='cart-quantity'>
                            <h3>{product.title}</h3>
                            <div className='remove-btn-container'>
                                <button
                                onClick={() => cartActions.removeFromCart(product.id)}
                                >Remove item</button>
                            </div>
                        </div>
                        <img src={product.thumbnail} alt={product.title} />
                        <br />
                        <span>Price: {product.price}</span>
                    </div>
                ))}
            </div>
            }
            </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close cart</Button>
                </DialogActions>
            </Dialog>
            </div>
        </div>
    )
  }