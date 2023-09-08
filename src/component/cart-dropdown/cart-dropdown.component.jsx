import { useContext } from "react";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";
import { CartContext } from "../../contexts/cart-context.component";

const CartDropdown = () => {
    const { cartItems } = useContext(CartContext)

    return (
        <div className="cart-dropdown-container">
            {
                cartItems.length !== 0 ?
                    (
                        <div className="cart-items">
                            {cartItems.map(item => <CartItem product={item} key={item.id} />)}
                        </div>

                    ) : (
                        <h3 className="empty-message">
                            No items in the car
                        </h3>
                    )
            }
            <Button text='Checkout' />
        </div>
    );
}

export default CartDropdown;