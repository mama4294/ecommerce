import {createContext, useState} from 'react'


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)

    return(
        <CartContext.Provider value={{isCartOpen, setIsCartOpen}}>
        {children}
        </CartContext.Provider>
        )
}
