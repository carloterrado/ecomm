
import { useContext } from "react";
import { CartContext } from "../../contexts/cart-context.component";
import CheckoutItem from "../../component/checkout-item/checkout-item.component";
import "./checkout.styles.scss";

const Checkout = () => {
    const { cartItems, totalCount } = useContext(CartContext);

    

    return (
        <div className="checkout-container">
            <div className="checkout-header">
                <div className="header-block"> <span>Product</span></div>
                <div className="header-block"> <span>Description</span></div>
                <div className="header-block"> <span>Quantity</span></div>
                <div className="header-block"> <span>Price</span></div>
                <div className="header-block"> <span>Remove</span></div>
            </div>
            {
                cartItems.map((item) =>  ( <CheckoutItem key={item.id} item={item} />))
            }
            <div className="total">Total: <span>{totalCount}</span></div>

        </div>
    );
}

export default Checkout;