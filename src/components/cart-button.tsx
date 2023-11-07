import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCartContext } from '../contexts/cartContext';
import { CartItem } from '../model/product';
import { styled, Badge, BadgeProps } from '@mui/material';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -20,
      top: -10,
      border: `1px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  }));

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

        const calculateTotalPrice = (cart:CartItem[]) => {
            const priceArray = []
            for (let i = 0; i < cart.length; i++) {
                const cartItem = cart[i];
                priceArray.push(cartItem.product.price * cartItem.qty);
            }
            const init = 0;
            const fullPrice = priceArray.reduce(
                (acc, curr) => acc + curr,
                init
              );
            return fullPrice
        }

      return (
        <div className='cart-controls-container'>
            <div className='cart-controls'>
            Open your cart
            <IconButton 
                color="primary" 
                aria-label="add to shopping cart"
                onClick={handleClickOpen}
                >
                    <StyledBadge badgeContent={calculateTotalItems(cartContext.cart)} color="primary"></StyledBadge>
                <ShoppingCartIcon />
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
                <span>Grand total: {calculateTotalPrice(cartContext.cart)}</span><br/>
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
                                >Remove item entirely
                                </button>
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