import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../component/product-card/product-card.component";
import "./category.styles.scss";
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";


const Category = () => {

    console.log('render/re-redering category component')
    const { category } = useParams();
    const categories = useSelector(selectCategories);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        console.log('effect fired call setProduct')
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