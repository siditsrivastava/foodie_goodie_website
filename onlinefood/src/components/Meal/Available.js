/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { adddata } from "../redux/counterSlice";
import "./Available.css";
import Spinner from "react-bootstrap/Spinner";
// import SamosaImg from "../Image/samosa_img.jpg";
import nodatafound from '../Image/nodatafound.gif'

const Available = () => {
  const dispatch = useDispatch();

  const [Fooddata, setfooddata] = useState();
  const [loading, setLoading] = useState(false);

  const FoodAllData = () => {
      try {
        fetch("https://foodie-goodie-website-sid.vercel.app")
          .then((res) => res.json())
          .then((data) => setfooddata(data));
      } catch (err) {
       console.log(err);
        
      }
  };
  useEffect(() => {
      FoodAllData();
      setTimeout(() => {
        setLoading(true);
      }, 2000); 
  }, []);

  return (
    <>
      <section className="meals">
        {loading ? Fooddata ? (
          <ul>
            {Fooddata.map((items) => {
              return (
                <section className="meal" key={items._id}>
                  <li>
                    <div className="dishname-section">
                      <div className="dish_img">
                        <img
                          src={items.image}
                          alt={`${items.dishname}-image`}
                        />
                      </div>
                      <div className="dish-content">
                        <h3>{items.dishname}</h3>
                        <div className="description">{items.description}</div>
                        <div className="price">Rs. {items.price}</div>
                      </div>
                    </div>
                  </li>
                  <button onClick={() => dispatch(adddata(items))}>
                    Add ++
                  </button>
                </section>
              );
            })}
          </ul>
        ) : <div>
          {/* <img src={nodatafound} alt="nodatafound_img"/>
           */}
           <div className="nodatafound">
           <img src={nodatafound} alt="NO DATA FOUND"/>
           </div>
          
        </div> : (
          <div className="spinner">
           <h5>Loading....</h5> 
           <Spinner style={{fontSize:"20px"}}/>
          </div>
        ) }
      </section>
    </>
  );
};

export default Available;
