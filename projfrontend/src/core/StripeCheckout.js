import React, { useState } from 'react'
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout";
import { API, STRIPE_KEY } from '../backend';
import { createOrder } from './helper/orderHelper';



const StripeCheckout = ({products, setReload = f => f, reload = undefined}) => {
    
    const [data, setData] = useState({
        loading: false,
        success: false, 
        error: "",
        address: ""
    });

    const token = isAuthenticated() && isAuthenticated().token;
    const userId = isAuthenticated() && isAuthenticated().user._id;

    const getFinalPrice = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount;
    };

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type" : "application/json"
        }
        return fetch(`${API}/stripepayment`,{
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            
            const orderData = {
                products: products,
                transaction_id: response.transaction.id,
                amount: response.transaction.amount
            }
            createOrder(userId, token, orderData);
            cartEmpty(() => {
                console.log("Did crash??")
            });

            setReload(!reload);
        })
        .catch(err => console.log(err))
    };

    require('dotenv').config();
    

    const showStripeButton = () => {
        return isAuthenticated() ? (
            <StripeCheckoutButton
                stripeKey = "pk_test_h1FYfv4MDTUkNl6LghLqXB4a00jLKOJt6Z"
                token={makePayment}
                amount={getFinalPrice() * 100}
                name="Buy T-shirts"
                shippingAddress
                billingAddress
            > 
                <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">Signin</button>
            </Link>
        )
    }

    return (
        <div>
            <h3 className="text-white">Stripe Checkout loaded: $ {getFinalPrice()}</h3>
            {products.length > 0 ? (
                    showStripeButton()
                ) : (
                    <h3>Add products to cart</h3>
                )}
        </div>
    )
}
export default StripeCheckout;