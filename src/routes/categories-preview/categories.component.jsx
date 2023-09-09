import { Fragment, useContext } from "react";
import CategoryPreview from "../../component/category-preview/category-preview.component";

import { CategoriesContext } from "../../contexts/categories-context.component";






const CategoriesPreview = () => {
    const { categories } = useContext(CategoriesContext)
    return (
        <div className="shop-container">
            {Object.keys(categories).map((title, i) => {
                const products = categories[title];
                return (<CategoryPreview key={i} title={title} products={products} />);
            })}
        </div >

    );
}

export default CategoriesPreview;
