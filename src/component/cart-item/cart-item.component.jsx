import "./cart-item.styles.scss";

const CartItem = ({ product }) => {
    const { name, imageUrl, quantity, price } = product;
    return (
        <div className="cart-item-container">
            <img src={imageUrl} alt={name} />
            <div className="item-details ">
                <h3 className="name">{name}</h3>
                <span>{`${quantity} X ${price}`}</span>
            </div>
        </div>
    );
}

export default CartItem;