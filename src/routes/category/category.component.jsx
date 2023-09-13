import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../component/product-card/product-card.component";
import "./category.styles.scss";
import { useSelector } from "react-redux";
import { selectCategories, selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../component/spinner/spinner.component";


const Category = () => {

    const { category } = useParams();
    const categories = useSelector(selectCategories);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState([]);


    useEffect(() => {
        setProducts(categories[category])
    }, [category, categories]);

    return (
        <>
            {
                isLoading ? <Spinner /> : (
                    <>
                        <h2 className="category-name">{category.toUpperCase()}</h2>
                        <div className="category-set-container">
                            {products && products.map((product, i) => <ProductCard key={i} product={product} />)}
                        </div>
                    </>
                )
            }
        </>

    );
}

export default Category;