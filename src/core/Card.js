import React, {useEffect, useState} from "react"
import ImageHelper from "./helper/ImageHelper"
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({product, addtoCart, removeFromCart, setReload = f => f , reload = undefined}) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "A photo frm pexels"
    const cardDescription = product ? product.description : "Default description"
    const cardPrice = product ? product.price : "DEFAULT"

    const addToCart = () => {
      addItemToCart(product, () => setRedirect(true))
    }

    const getARedirect = (redirect) => {
      if(redirect){
        return <Redirect to="/cart" />
      }
    }


    const showAddTOCart = (addtoCart) => {
        return(
            addtoCart && (
                <button
                onClick={addToCart}
                className="btn btn-success rounded" 
              >
                Add to Cart
              </button>
            )
        )
    }

    const showRemoveFromCart = (removeFromCart) => {
        return(
            removeFromCart && (
            <button
                onClick={() => {
                  removeItemFromCart(product._id)
                  setReload(!reload)
                }
                }
                className="btn btn-danger rounded"
              >
                Remove from cart
            </button>)
        )
    }

    // return (
    //   <div className="card text-white bg-dark border border-info ">
    //     <div className="card-header lead">{cardTitle}</div>
    //     <div className="card-body">
    //       {getARedirect(redirect)}
    //       <ImageHelper product={product}/>
    //       <p className="lead bg-success font-weight-normal text-wrap">
    //         {cardDescription}
    //       </p>
    //       <p className="btn btn-success rounded  btn-sm px-4">${cardPrice}</p>
          // <div className="row">
          //   <div className="col-12">
          //     {showAddTOCart(addtoCart)}
          //   </div>
          //   <div className="col-12">
          //     {showRemoveFromCart(removeFromCart)}
          //   </div>
          // </div>
    //     </div>
    //   </div>
    // );

    return(
          <div className="card mb-3" >
            {getARedirect(redirect)}
            <div className="row no-gutters">
                <div className="col-md-7 pb-0" >
                <ImageHelper product={product}/>
                </div>
                <div className="col-md-5">
                  <div className="card-body">
                    <h5 className="card-title text-dark">{cardTitle}</h5>
                    <p className="card-text text-dark">{cardDescription}</p>
                    <p className="card-text text-dark">${cardPrice}</p>
                    <div className="row">
                      <div className="col-12">
                        {showAddTOCart(addtoCart)}
                      </div>
                      <div className="col-12">
                        {showRemoveFromCart(removeFromCart)}
                      </div>
                  </div>
                  </div>
                  
                </div>
            </div>
          </div>
    )
  };

export default Card;