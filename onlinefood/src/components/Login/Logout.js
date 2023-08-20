import React , { useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Logout = () => {

  const navigate = useNavigate();

  const userLogout = () => {
    fetch('/logout', {
      method : "GET",
      headers : {
        Accept: "application/json",
        "Content-Type" : "application/json"
      },
      credential : "include"
    })
    .then((res) => {
         navigate("/login")
         if(res.status !== 200){
          const err = new Error(res.error);
          throw err;
         }
    }).catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    userLogout()
  }, [])
  

  return (
    <div>
     {/* <h1>
     Logout Successfully !!!
     </h1>      */}
      </div>
  )
}

export default Logout