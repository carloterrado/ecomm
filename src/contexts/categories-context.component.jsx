import { createContext, useEffect, useState } from "react";
import SHOP_DATA from "../shop-data.js";
import { addCollectionsAndDocuments, getCollectionsAndDocument } from "../utils/firebase/firebase.utils.js";

export const CategoriesContext = createContext({
    categories: {},
});

export const CategoriesProvider = ({ children }) => {
    const [categories, setCategories] = useState({});
    const value = { categories }
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCollectionsAndDocument();
            setCategories(categoryMap)
        }
        getCategoriesMap();
    }, [])
    

    return (<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>);
}