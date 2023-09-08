import { useContext } from "react";
import "./shop.styles.scss";
import { ProductContext } from "../../contexts/product-context.component";
import ProductCard from "../../component/product-card/product-card.component";



const Shop = () => {
    const {products} = useContext(ProductContext)
    return (
        <div className="products-container">
            {products.map((product) => {
                return ( <ProductCard key={product.id} product={product} />)
            })}
        </div>
    );
}

export default Shop;
