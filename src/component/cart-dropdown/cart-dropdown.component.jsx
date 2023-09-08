import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";
import { CartContext } from "../../contexts/cart-context.component";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)

    const goTo = useNavigate();
    const handleCheckout = () => goTo('/checkout');

    return (
        <div className="cart-dropdown-container">
            {
                cartItems.length !== 0 ?
                    (
                        <>
                            <div className="cart-items">
                                {cartItems.map(item => <CartItem product={item} key={item.id} />)}
                            </div>
                            <Button text='Checkout' onClick={handleCheckout} />
                        </>
                    ) : (
                        <h3 className="empty-message">
                            No items in the car
                        </h3>
                    )
            }
        </div>
    );
}

export default CartDropdown;