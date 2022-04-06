import "./checkout-item.styles.scss";
import { useContext } from "react";
import {CartContext} from "../../contexts/cart.context";

const CheckoutItem = ({cartItem}) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { removeItemFromCart, addItemToCart, decreaseProductQuantity } = useContext(CartContext);

    const handleRemoveItem = () => removeItemFromCart(cartItem);
    const handleIncreaseQuantity = () => addItemToCart(cartItem);
    const handleDecreaseQuantity = () => decreaseProductQuantity(cartItem);
    
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
