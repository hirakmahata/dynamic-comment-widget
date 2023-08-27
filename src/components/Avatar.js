import React from 'react'
import Profile from "../assets/avatar.jpg";


const Avatar = () => {
  return (
    <div>
        <img src={Profile} alt="profile" style={{height: "45px"}} />
    </div>
  )
}

export default Avatar