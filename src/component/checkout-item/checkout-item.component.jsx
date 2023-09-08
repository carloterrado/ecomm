import { useContext } from "react";
import "./checkout-item.styles.scss";
import { CartContext } from "../../contexts/cart-context.component";

const CheckoutItem = ({ item }) => {
    const { imageUrl, name, quantity, price } = item;
    const { addItemToCart, removeItemToCart , clearItemFromCart} = useContext(CartContext);

    const handleClearItem = () => clearItemFromCart(item);
    const handleRemoveQty = () => removeItemToCart(item);
    const handleAddQty = () => addItemToCart(item);

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name} />
            </div>
            <span className="name">{name} </span>
            <span className="quantity">
                <span className="arrow" onClick={handleRemoveQty}>&#10094;</span>
                <div className="value">{quantity}</div>
                <span className="arrow" onClick={handleAddQty}>&#10095;</span>
            </span>
            <span className="price">{price} </span>
            <span className="remove-button" onClick={handleClearItem}>&#10005; </span>
        </div>
    );
}

export default CheckoutItem;