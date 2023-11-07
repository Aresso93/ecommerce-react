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
import { CartItem } from '../model/product';

  export function CartButton() {
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

        const calculateTotalItems = (cart:CartItem[]) => {
            const qtyArray = []
            for (let i = 0; i < cart.length; i++) {
                const cartItem = cart[i];
                qtyArray.push(cartItem.qty);
            }
            const init = 0;
            const fullCart = qtyArray.reduce(
                (acc, curr) => acc + curr,
                init
              );
            return fullCart
        }

      return (
        <div className='cart-controls-container'>
            <div className='cart-controls'>
            Open your cart ({calculateTotalItems(cartContext.cart)} total products in cart)
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
                {cartContext.cart.map(cartItem=>(
                    <div className='cart-content' key={cartItem.product.id}>
                        <div className='cart-quantity'>
                            <h3>{cartItem.product.title}</h3>
                            <div className='remove-btn-container'>
                                <button
                                onClick={() => cartContext.actions.removeFromCart(cartItem.product.id)}
                                >Remove item entirely</button>
                            </div>
                            <div className='quantity-container'>
                                <button
                                onClick={() => cartContext.actions.decreaseQuantity(cartItem.product)}
                                >-</button>
                                <div>{cartItem.qty}</div>
                                <button
                                onClick={() => cartContext.actions.increaseQuantity(cartItem.product)}
                                >+</button>
                                
                            </div>
                        </div>
                        <img src={cartItem.product.thumbnail} alt={cartItem.product.title} />
                        <br />
                        <span>Price: {cartItem.product.price}</span>
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