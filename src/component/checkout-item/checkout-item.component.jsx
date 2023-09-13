import { useDispatch, useSelector } from "react-redux";
import "./checkout-item.styles.scss";
import { addItemToCart, clearItemFromCart, removeItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({ item }) => {
    const { imageUrl, name, quantity, price } = item;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const handleClearItem = () => dispatch(clearItemFromCart(cartItems, item));
    const handleRemoveQty = () => dispatch(removeItemToCart(cartItems, item));
    const handleAddQty = () => dispatch(addItemToCart(cartItems, item));

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