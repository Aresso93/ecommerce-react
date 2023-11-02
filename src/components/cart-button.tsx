import * as React from 'react';
import { Product } from '../model/product';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export interface CartButtonProps{
    cartItems: Product[]
}

  export function CartButton(props: CartButtonProps) {
    
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');
    const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
        setOpen(true);
        setScroll(scrollType);
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
            Open your cart ({props.cartItems.length} products in cart)
            <IconButton 
                color="primary" 
                aria-label="add to shopping cart"
                onClick={handleClickOpen('body')}
                >
                <AddShoppingCartIcon />
            </IconButton>
            <Dialog
            open={open}
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Your cart</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
                >
            These are the products you currently have in your cart:
          </DialogContentText>
          {
            <div className='cart'>
                {props.cartItems.map(product=>(
                    <div className='cart-content' key={product.id}>
                        <h3>{product.title}</h3>
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