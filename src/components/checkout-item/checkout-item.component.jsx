import "./checkout-item.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearItemFromCart, addItemToCart, removeItemFromCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();

    const handleRemoveItem = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const handleIncreaseQuantity = () => dispatch(addItemToCart(cartItems, cartItem));
    const handleDecreaseQuantity = () => dispatch(removeItemFromCart(cartItems, cartItem));
    
    return(
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div className="arrow" onClick={handleDecreaseQuantity}>&#10094;</div>
                <span className="value">{quantity}</span>
                <div className="arrow" onClick={handleIncreaseQuantity}>&#10095;</div>
            </span>
            <span className="price">{price}</span>
            <div className="remove-button" onClick={handleRemoveItem}>&#10005;</div>
        </div>
    )
}

export default CheckoutItem;
