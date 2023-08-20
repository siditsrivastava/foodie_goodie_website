import React , {useEffect, useState}from "react";
import { Modal } from "react-bootstrap";
import { useSelector , useDispatch } from "react-redux";
import "./Carts.css";
import CartsItems from "./CartsItems";
import { removeAllData , totalPrice } from "../redux/counterSlice";

const Carts = (props) => {

   const FoodList = useSelector(state => state.counter.FoodList);
   const totalCost = useSelector(state => state.counter.totalCost)
   const dispatch = useDispatch();
   dispatch(totalPrice());

   const orderData = () => {
    alert("Congrats !! Your Order is Successfully Submited")
   }
   
  return (
    <Modal show={props.show} onHide={props.handleClose}>
    { 
    FoodList.length < 0 ? ""
        :
         FoodList.map((items) => {
          return(
              <CartsItems items={items}/>
          )
        }) 
    }
      <div className="total">
        <span> Total Amount</span>
        <span className="total-amount">Rs.{totalCost}</span>
      </div>
      <div className="action">
        { FoodList.length > 0 ? 
         <button className=".button--alt btn" onClick={orderData}>Order</button>
          : " " 
         }  
       {
        FoodList.length > 0 ? 
       <button className="btn" onClick={() => dispatch(removeAllData())} > Remove All</button> 
         : " "
       }
        <button className="btn" onClick={props.handleClose}>
          Close
        </button>
      </div>
      <br></br>
    </Modal>
  );
};

export default Carts;
