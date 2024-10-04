import React from 'react'
import './Loader.css'
const Loader = () => {
  return (
    <div style={{backgroundColor:'rgb(235,235,235)',padding:'4em 30em'}}>
        <div className='card' style={{backgroundColor:'white',minHeight:'70vh',justifyContent:'center',alignItems:'center'}}>
        <img src="https://superstorefinder.net/support/wp-content/uploads/2018/01/4colors.gif" alt="" style={{width:'10em'}} />
      </div>
    </div>
  )
}

export default Loader
