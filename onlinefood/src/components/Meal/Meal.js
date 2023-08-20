import React from 'react'
import Available from './Available';
import MealSummary from './MealSummary';
import HeaderImg from '../Image/meals.jpg'

const Main = () => {
  return (
    <div>
      <div className="main-image">
        <img src={HeaderImg} alt="Header-Img" />
      </div>
        <MealSummary/>
        <Available/>
    </div>

  )
}

export default Main