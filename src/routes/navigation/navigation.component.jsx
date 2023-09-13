import { Fragment } from "react";
import { Link, Outlet } from "react-router-dom";
import './navigation.styles.scss';
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import CartIcon from "../../component/cart-icon/cart-icon.component";
import CartDropdown from "../../component/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectIsCartOpen } from "../../store/cart/cart.selector";

const Navigation = () => {
    // const { currentUser } = useContext(UserContext)

    const currentUser = useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen)


    return (
        <Fragment >
            <div className="navigation">
                <Link className="logo-container" to={'/'}>
                    <Logo className="logo" />
                </Link>
                <div className="nav-links-container">
                    <Link className="nav-link" to={'/shop'}>
                        SHOP
                    </Link>
                    {currentUser ?
                        (<span className="nav-link" onClick={signOutUser}>LOGOUT</span>) :
                        (<Link className="nav-link" to={'/auth'}>SIGN IN</Link>)}
                    <CartIcon />
                </div>
                {isCartOpen && <CartDropdown />}
            </div>
            <Outlet />
        </Fragment>
    );
}

export default Navigation;