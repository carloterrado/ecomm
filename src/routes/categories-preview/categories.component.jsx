import { useSelector } from "react-redux";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategories, selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import Spinner from "../../component/spinner/spinner.component";







const CategoriesPreview = () => {
    const categories = useSelector(selectCategories);
    const isLoading = useSelector(selectCategoriesIsLoading);
    // const categories = [];

    return (
        <div className="shop-container">
            {
                isLoading ? <Spinner /> : Object.keys(categories).map((title, i) => {
                    const products = categories[title];
                    return (<CategoryPreview key={i} title={title} products={products} />);
                })
            }
        </div >

    );
}

export default CategoriesPreview;
