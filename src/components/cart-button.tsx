import * as React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useCartContext } from "../contexts/cartContext";
import { CartItem } from "../model/product";
import { styled, Badge, BadgeProps } from "@mui/material";


const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -20,
    top: -10,
    border: `1px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

export function CartButton() {
  const cartContext = useCartContext();
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

  const calculateTotalItems = (cart: CartItem[]) => {
    const init = 0;
    const reducedCart = cart.reduce((acc, curr) => acc + curr.qty, init);
    return reducedCart;
  };

  const calculateTotalPrice = (cart: CartItem[]) => {
    const init = 0;
    const fullPrice = cart.reduce((acc, curr) => acc + curr.qty * curr.product.price, init);
    return fullPrice;
  };

  return (
        <>
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={handleClickOpen}
        >
          <StyledBadge
            badgeContent={calculateTotalItems(cartContext.cart)}
            color="success"
          ></StyledBadge>
          <ShoppingCartIcon color="action"/>
        </IconButton>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={"body"}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <div className="close-btn-container">
            <Button onClick={handleClose}>X</Button>
          </div>
          <DialogTitle id="scroll-dialog-title">Your cart</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <span>
                Grand total: {calculateTotalPrice(cartContext.cart)} gold coins
              </span>
              <br />
              These are the products you currently have in your cart:
            </DialogContentText>
            {
              <div className="cart">
                {cartContext.cart.map((cartItem) => (
                  <div className="cart-content" key={cartItem.product.id}>
                    <div className="cart-quantity">
                      <h3>{cartItem.product.title}</h3>
                      <div className="container-container">

                      <div className="remove-btn-container">
                        Remove
                        <IconButton
                          color="primary"
                          aria-label="delete"
                          onClick={() =>
                            cartContext.actions.removeFromCart(
                              cartItem.product.id
                            )
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                      </div>
                      <div className="how-many">Quantity</div>
                      <div className="quantity-container">

                      <IconButton
                          color="primary"
                          aria-label="remove one"
                          onClick={() =>
                            cartContext.actions.decreaseQuantity(
                              cartItem.product
                            )
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <div>{cartItem.qty}</div>
                        <IconButton
                          color="primary"
                          aria-label="add one"
                          onClick={() =>
                            cartContext.actions.increaseQuantity(
                              cartItem.product
                            )
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </div>
                    </div>
                    <img
                      src={cartItem.product.thumbnail}
                      alt={cartItem.product.title}
                    />
                    <br />
                    <span>
                      Price (each): {cartItem.product.price} (you save{" "}
                      {cartItem.product.discountPercentage}%)
                    </span>
                    <hr />
                  </div>
                ))}
                <div className="checkout-btn">
                {cartContext.cart.length !== 0 ?
                <button
                onClick={() => console.log('check THIS out!', cartContext.cart)}
                >
                Checkout
                </button>
                :
                <span>Your cart is currently empty</span>
                    }

                </div>
              </div>
            }
          </DialogContent>
        </Dialog>
        </>
  );
}
