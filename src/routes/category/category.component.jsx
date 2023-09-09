import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesContext } from "../../contexts/categories-context.component";
import ProductCard from "../../component/product-card/product-card.component";
import "./category.styles.scss";


const Category = () => {
    const { category } = useParams();
    const { categories } = useContext(CategoriesContext);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(categories[category])
    }, [category, categories]);

    return (
        <>
            <h2 className="category-name">{category.toUpperCase()}</h2>
            <div className="category-set-container">
                {products && products.map((product, i) => <ProductCard key={i} product={product} />)}
            </div>
        </>

    );
}

export default Category;