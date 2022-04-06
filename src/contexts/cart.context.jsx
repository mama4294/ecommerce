import {createContext, useState, useEffect} from 'react'

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

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [cartTotal, setCartTotal] = useState(0)

    useEffect(() => {
        // update number of items in cart
        const newCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
        setCartCount(newCartCount)
        // update cart total
        const newCartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
        setCartTotal(newCartTotal)
    },[cartItems])


    const addItemToCart = (productToAdd) =>setCartItems(addCartItem(cartItems, productToAdd))
    const removeItemFromCart = (productToRemove) =>setCartItems(removeCartItem(cartItems, productToRemove))
    const decreaseProductQuantity = (product) =>setCartItems(decreaseCartItemQty(cartItems, product))
    
    
    return(
        <CartContext.Provider value={{isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, decreaseProductQuantity, cartTotal}}>
        {children}
        </CartContext.Provider>
        )
}
