import { useContext } from "react";
import Button from "../button/button.component";
import "./product-card.styles.scss";
import { CartContext } from "../../contexts/cart-context.component";

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemToCart } = useContext(CartContext)

    const handleAddToCart = () => {
        addItemToCart(product);
    }

    return (
        <div className="product-card-container">
            <img src={imageUrl} alt={name} />
            <div className="footer">
                <span className="name">{name} </span>
                <span className="price">{price} </span>
            </div>
            <Button buttonType='inverted' text="Add to cart" onClick={handleAddToCart}></Button>
        </div>
    );
}

export default ProductCard;