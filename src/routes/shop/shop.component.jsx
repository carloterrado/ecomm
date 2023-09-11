
import { Route, Routes } from "react-router-dom";
import "./shop.styles.scss";

import CategoriesPreview from "../categories-preview/categories.component";
import Category from "../category/category.component";
import { useEffect } from "react";
import { getCollectionsAndDocument } from "../../utils/firebase/firebase.utils";
import { setCategories } from "../../store/categories/categories.action";
import { useDispatch } from "react-redux";






const Shop = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryArray = await getCollectionsAndDocument();
            dispatch(setCategories(categoryArray));
        }
        getCategoriesMap();
    }, [])
    
    return (
        <Routes >
            <Route index element={<CategoriesPreview />} />
            <Route path=":category" element={<Category />} />
        </Routes>
    );
}

export default Shop;
