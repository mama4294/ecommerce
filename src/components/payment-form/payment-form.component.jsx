import { useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/user/user.selector";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { Button, BUTTON_TYPE_CLASS } from "../button/button.component";
import {PaymentButton, PaymentFormContainer, FormContainer} from "./payment-form.styles";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const currentUser = useSelector(selectCurrentUser);
    const amount = useSelector(selectCartTotal);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    console.log(currentUser);

    const paymentHandler = async (event) => {
        event.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        setIsProcessingPayment(true);

        const response = await fetch("/.netlify/functions/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({amount: amount*100}),
            }).then(res => res.json());
  


         const clientSecret = response.paymentIntent.client_secret;   
         console.log(clientSecret);

         const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : "Guest",
                }
            }
        })
        setIsProcessingPayment(false);

         console.log(paymentResult);

         if(paymentResult.error){
             alert(paymentResult.error.message);
         }else{
             if(paymentResult.paymentIntent.status === "succeeded"){
                 alert("Payment Successful");
             }
         }

    }   


return(
    <PaymentFormContainer>
        <FormContainer onSubmit={paymentHandler}>
            <h2>Credit Card Payment:</h2>
        <CardElement />
        <PaymentButton isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASS.inverted}>Pay</PaymentButton>
        </FormContainer>
    </PaymentFormContainer>
)
}

export default PaymentForm