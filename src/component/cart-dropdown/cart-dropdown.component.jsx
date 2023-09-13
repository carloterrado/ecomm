import { useNavigate } from "react-router-dom"
import {useSelector} from "react-redux"
import { selectCartItems } from "../../store/cart/cart.selector";

import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";
import "./cart-dropdown.styles.scss";

const CartDropdown = () => {
    
    const cartItems = useSelector(selectCartItems);

    const goTo = useNavigate();
    const handleCheckout = () => goTo('/checkout');
    const handleGoToShop = () => goTo('/shop');

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
                        <>
                            <h3 className="empty-message">
                                No items in the car
                            </h3>
                            <Button text='Shop Now' onClick={handleGoToShop} />
                        </>
                    )
            }
        </div>
    );
}

export default CartDropdown;