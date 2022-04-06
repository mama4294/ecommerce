import {createContext, useState, useEffect} from 'react'

import {getCategoriesAndDocuments} from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
    categoriesMap: {},
    setProducts: () => null,
})

export const CategroiesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({})

    useEffect(() => {
        const getCategories = async () => {
            const categories = await getCategoriesAndDocuments()
            setCategoriesMap(categories)
        }
        getCategories()
    }, [])

    return(
        <CategoriesContext.Provider value={{categoriesMap, setCategoriesMap}}>
        {children}
        </CategoriesContext.Provider>
        )
}
