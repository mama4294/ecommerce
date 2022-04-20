import {Outlet } from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/crown.svg';
import CartIcon from "../../components/cart-icon/cart-icon.component.jsx";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component.jsx";

import {selectCurrentUser} from "../../store/user/user.selector"
import { selectIsCartOpen } from "../../store/cart/cart.selector";
import {signOutUser} from "../../utils/firebase/firebase.utils";

import {NavigationContainer, LogoContainer, NavLinks, NavLink} from "./navigation.styles.jsx";
import { useSelector } from "react-redux";


const Navigation = () => {
   const currentUser = useSelector(selectCurrentUser)
    const isCartOpen = useSelector(selectIsCartOpen);



    return (
    <>
        <NavigationContainer>
            <LogoContainer to='/'>
               <Logo className="logo"/>
            </LogoContainer>
            <NavLinks>
                <NavLink to='/shop'>
                 SHOP
                </NavLink>
            {currentUser ? (
            <NavLink as="span" onClick={signOutUser}> SIGN OUT</NavLink>
            ) :(
               <NavLink to='/auth'>
               SIGN IN
              </NavLink>
            )}
            <CartIcon />
            </NavLinks>
            {isCartOpen && <CartDropdown/>}
      
        </NavigationContainer>
        <Outlet />
     </>

    );
  };

  export default Navigation;