import "./cart-dropdown.styles.scss";
import React from 'react'
import {Button} from "../button/button.component.jsx";

const CartDropdown = () => {
  return (
    <div className="cart-dropdown-container">
        <div className="cart-items"/>
        <Button>CHECKOUT</Button>
    </div>
  )
}

export default CartDropdown
