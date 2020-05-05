import React from "react"
import { API } from "../../backend";


const ImageHelper = ({product}) => {
    const Imageurl = product ? `${API}/product/photo/${product._id}` : "https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
    // return(
    //     <div className="rounded border border-success p-2">
    //         <img
    //           src={Imageurl}
    //           alt="photo"
    //           style={{ maxHeight: "100%", maxWidth: "100%" }}
    //           className="mb-3 rounded"
    //         />
    //       </div>
    // )
    return(
      
          <img
            src={Imageurl}
            alt="photo"
            className="card-img"
            
            
          />
        
  )

}

export default ImageHelper;