import {createContext, useReducer} from 'react'
import {createAction} from "../utils/reducer/reducer.utils.js"

const addCartItem = (cartItems, productToAdd) =>{
    const existingCartItem = cartItems.find(cartItem => cartItem.id === productToAdd.id)
    if(existingCartItem){
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem)
    }
    return [...cartItems, {...productToAdd, quantity: 1}]
}

const decreaseCartItemQty = (cartItems, product) =>{
    const existingCartItem = cartItems.find(cartItem => cartItem.id === product.id)
    if(existingCartItem.quantity === 1){
        return cartItems.filter(cartItem => cartItem.id !== product.id)
    }
    return cartItems.map(cartItem => cartItem.id === product.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}


const removeCartItem = (cartItems, product) =>{
     return cartItems.filter(cartItem => cartItem.id !== product.id)
}


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    cartCount: 0,
    cartTotal: 0,
    removeItemFromCart: () => null,
    decreaseProductQuantity: () => null,
})

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type){
        case 'SET_CART_ITEMS':
            return {...state, ...payload}
        case 'SET_IS_CART_OPEN':
            return {...state, isCartOpen: payload}
        default:
            throw new Error(`Unhandled action type: ${type} in cartReducer`)
    }
}

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
}

const initialState = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0,
}

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(cartReducer, initialState)
    const {cartItems, cartCount, cartTotal, isCartOpen} = state;

    const updateCartItemsReducer = (newCartItems) => {
        // update cart count
        const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
        // update cart total
        const newCartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartCount: newCartCount, cartTotal: newCartTotal})) 
}

    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd)
        updateCartItemsReducer(newCartItems)
    }
    const removeItemFromCart = (productToRemove) =>{
        const newCartItems = removeCartItem(cartItems, productToRemove)
        updateCartItemsReducer(newCartItems)
    }

    const decreaseProductQuantity = (product) =>{
        const newCartItems =  decreaseCartItemQty(cartItems, product)
        updateCartItemsReducer(newCartItems)}

    const setIsCartOpen = (bool) =>{
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
    }
    
    
    return(
        <CartContext.Provider value={{isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, decreaseProductQuantity, cartTotal}}>
        {children}
        </CartContext.Provider>
        )
}
