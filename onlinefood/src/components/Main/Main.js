import React , {useState}  from 'react'
import Meal from '../Meal/Meal';
import HeaderSec from './HeaderSec';

const Main = () => {
  return (
    <div>  
        <HeaderSec/>
        <Meal/>
    </div>
  )
}

export default Main