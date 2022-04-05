import {createContext, useState, useEffect} from 'react'

import PRODUCTS from '../shop-data'


export const ProductsContext = createContext({
    products: [],
    setProducts: () => null,
})

export const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState(PRODUCTS[0].items)

    return(
        <ProductsContext.Provider value={{products, setProducts}}>
        {children}
        </ProductsContext.Provider>
        )
}
