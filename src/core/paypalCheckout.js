import React, {useState, useEffect} from "react"
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import {getmeToken, processPayment} from "./helper/paypalHelper"
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react"
//Card Number: 3782 822463 10005
//Expiration Date: 12/21

const PaypalCheckout = ({products, setReload = f => f, reload = undefined}) => {

    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {}
    })

    const userId = isAuthenticated() && isAuthenticated().user._id
    const token = isAuthenticated() && isAuthenticated().token


    const getToken = (userId, token) => {
        getmeToken(userId, token).then(data => {
            console.log("INFORMATION", data)
            if(data.error){
                setInfo({...info, error: data.error})
            } else{
                const clientToken = data.clientToken
                setInfo({clientToken})
                
            }
        })
    }

    const showDropIn = () => {
        return(
            <div>
                {info.clientToken !== null && products.length > 0 ?  (
                    <div>
                        <DropIn
                        options={{authorization: info.clientToken }}
                        onInstance={instance => (info.instance = instance)}
                        />
                        <button className="btn btn-block btn-success" onClick={onPurchase}>Buy</button>
                    </div>
                ) : (<h3>Please login or add something to card</h3>) }
            </div>
        )
    }


    useEffect(() => {
        getToken(userId, token)
    }, [])


    const onPurchase = () => {
        setInfo({loading: true})
        let nonce;
        let getNonce = info.instance
        .requestPaymentMethod()
        .then(data=> {
            nonce = data.nonce
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount()  
            }
            processPayment(userId, token, paymentData)
            .then(response => {
                setInfo({...info, success: response.success, loading:false})
                console.log("PAYMENT SUCCESS")
                const orderData = {
                    products: products,
                    transaction_id: response.transaction.id,
                    amount: response.transaction.amount
                }
                createOrder(userId, token, orderData)
                //empty the cart
                cartEmpty(() => {
                    console.log("cart emptied after doing payment with paypal")
                })
                //force reload
                setReload(!reload)
            })
            .catch(error => {
                setInfo({...info, loading: false, success: false})
                console.log("PAYMENT FAILED")

            })
        })
    }

    const getAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount;
    }


    return(
        <div>
            <h3>paypal checkout {getAmount()}$</h3>
            {showDropIn()}
        </div>
    )
}

export default PaypalCheckout;