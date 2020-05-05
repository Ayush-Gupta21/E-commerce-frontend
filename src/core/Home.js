import React, {useEffect, useState} from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card"
import { getProducts } from "./helper/coreapicalls";

const Home = () => {

  const [products, setProducts] = useState([])
  const [error, setError] = useState(false)

    const loadAllProduct = () => {
        getProducts().then(data => {
            if(data.error){
                console.log(data.error)
            } else{
                setProducts(data)
            }
        })
    }

    useEffect(() => {
      loadAllProduct();
  }, [])

  return (
    <Base title="Welcome to the Tshirt Store" description="">
      <div className="row text-center">
        {products.map((product, index) => {
          return(
            <div key={index} className="col-6">
            <Card product={product} addtoCart = {true} removeFromCart = {false}/>
            </div>
          )
        })}
      </div>
    </Base>
  );
}


export default Home;