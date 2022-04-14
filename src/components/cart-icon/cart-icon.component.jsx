import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles.jsx';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector.js';
import { setIsCartOpen } from '../../store/cart/cart.action.js';

const CartIcon = () => {
    const dispach = useDispatch()
    const cartCount = useSelector(selectCartCount)
    const isCartOpen = useSelector(selectIsCartOpen)
    const toggleIsCartOpen = () => dispach(setIsCartOpen(!isCartOpen))
    
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon className='shopping-icon'/>
        <ItemCount> {cartCount} </ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon
