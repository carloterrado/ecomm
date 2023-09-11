import { useSelector } from "react-redux";
import CategoryPreview from "../../component/category-preview/category-preview.component";
import { selectCategories } from "../../store/categories/categories.selector";







const CategoriesPreview = () => {
const categories = useSelector(selectCategories);
// const categories = [];

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
