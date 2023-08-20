/* eslint-disable jsx-a11y/img-redundant-alt */
import React, {useEffect, useState} from "react";
import "./CartsItems.css";
import { useDispatch } from "react-redux";
import { incrementQuantity , decrementQuantity  , removeData} from "../redux/counterSlice";

const CartsItems = ({ items }) => {

  const [userfooddata, setuserfooddata] = useState({
    dishid : items._id,
    dishnames : items.dishname,
    price : items.price

  })
  const [cartdata , setCartData] = useState([])
//   const userDataCart = async() => {
//     const {dishnames , price , dishid} = userfooddata
//     const res = await fetch("/carts" , {
//       method : "POST",
//       headers : {
//         "Content-Type" : "application/json"
//       },
//       body : JSON.stringify(
//         {
//         dishid,
//         dishnames,
//         price
//       })
//     })
//     const data = await res.json()
//     if (res.status === 422 || !data) {
//       alert("invalid Registation");
//       console.log("invalid Registation");
//     } else {
//       alert("Successful Registation");
//       console.log("Successful Registation");
//     }

//  }
const userDataCart = async() => {
  const {dishnames , price , dishid} = userfooddata
  const res = await fetch("/carts" , {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify(
      {
      dishid,
      dishnames,
      price
    })
  })
  const data = await res.json()
  if (res.status === 422 || !data) {
    alert("invalid Registation");
    console.log("invalid Registation");
  } else {
    alert("Successful Registation");
    console.log("Successful Registation");
  }

}

//  const userData = async () => {
//   try {
//     const res = await fetch("/sidi", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       credential: "include",
//     });
//     const data = await res.json();
//     setCartData(data.userorderdata);
//     console.log(data);
//     // setLogin(true);
//   } catch (e) {
//     console.log(e);
//   }
// };

 useEffect(() => {
    userDataCart();
}, [])

  const dispatch = useDispatch();

  return (
    <>
      <div className="cart-body" key={items._id}>
        <li className="cart-item">
          <div className="addcart-section">
            <div className="addcart_img">
              <img src={items.image} alt={`${items.dishname} image`} />
            </div>
            <div className="addcart-content">
            <h4>{items.dishname}</h4>
            <p className="prices">${items.price * items.quantity}</p>
            <p className="prices">{cartdata.price}</p>
            <p className="quantity">
              <input
                 type="text" 
                 placeholder={items.quantity} 
                 defaultValue={items.quantity} 
              />
           </p>
            </div>
          </div>
          <p>{items.id}</p>
          <div className="actions">
            <button onClick={() => dispatch(removeData(items._id))}>
              <i className="fa-solid fa-trash"></i>
            </button>
            <button onClick={() => dispatch(incrementQuantity(items._id))}>
              +
            </button>
            <button onClick={() => dispatch(decrementQuantity(items._id))}>
              -
            </button>
            
          </div>
        </li>
      </div>
    </>
  );
};

export default CartsItems;
