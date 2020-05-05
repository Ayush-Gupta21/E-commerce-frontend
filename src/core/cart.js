import React, {useEffect, useState} from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card"
import {loadCart} from "./helper/cartHelper"
import StripeCheckout from "./StripeCheckout"
import PaypalCheckout from "./paypalCheckout";

const Cart = () => {

    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(false)

    useEffect(() => {
        setProducts(loadCart());
    }, [reload])


  const loadAllProducts = products => {
    return (
        <div>
            <h2>This section is to load products</h2>
            {products.map((product, index) => (
                <Card 
                key={index} 
                product={product} 
                addtoCart={false} 
                removeFromCart={true}
                setReload={setReload}
                reload={reload}
                />
            ))}
        </div>
    ) 
  } 

  const loadCheckout = () => {
    return (
        <div>
            <h2>This section is for checkout</h2>
            
        </div>
    ) 
  } 
  

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
  <div className="col-md-6">{products.length > 0 ? loadAllProducts(products) : (<h3>NO products in cart</h3>)}</div>
  <div className="col-md-6">
  <StripeCheckout
  products={products}
  setReload={setReload}
  reload={reload}
  />
  <PaypalCheckout
  products={products}
  setReload={setReload}
  reload={reload}
  />
  </div>

      </div>
    </Base>
  );
}


export default Cart;