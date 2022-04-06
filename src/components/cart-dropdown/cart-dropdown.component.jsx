import {CartDropdownContainer, EmptyMessage, CartItems}  from "./cart-dropdown.styles.jsx";
import {useContext} from 'react'
import {CartContext} from "../../contexts/cart.context";
import { useNavigate } from 'react-router-dom';

import {Button} from "../button/button.component.jsx";
import CartItem from "../cart-item/cart-item.component"

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext)

    const navigate = useNavigate();
    const navigateToCheckout = () => {
        navigate('/checkout');
    }

  return (
    <CartDropdownContainer>
        <CartItems>
            {cartItems.length ? cartItems.map(item=>(
              <CartItem key={item.id} CartItem={item}/>)
            ): 
            <EmptyMessage>No items in cart</EmptyMessage>
            }
        </CartItems>
        <Button onClick={navigateToCheckout}>CHECKOUT</Button>
    </CartDropdownContainer>
  )
}

export default CartDropdown
