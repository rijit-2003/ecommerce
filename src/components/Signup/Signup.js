import React, { useState } from 'react'
import '../Login/Login.css'
import { useSelector,useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {logincreator} from '../state/index';
import BASE_URL from '../../config'
const Signup = () => {
  const dispatch=useDispatch();
  const {addlocalstorage,removelocalstorage}=bindActionCreators(logincreator,dispatch);
  const [loading,setLoading]=useState(false)
  const [info,setinfo]=useState({name:"",email:"",password:"",cpassword:""})
  const navigate=useNavigate()
  const host = BASE_URL;



  const handlesubmit=async(e)=>{
    e.preventDefault()
    setLoading(true);
    if(info.password!==info.cpassword){
      alert("Password did'nt match");
      return;
    }
    const response=await fetch(`${host}/api/auth/createuser`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({name:info.name,email:info.email,password:info.password})
    })
    setLoading(false)
    const json=await response.json();
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      localStorage.setItem('name',info.name)
      addlocalstorage()
      alert("Account created successfully")
      navigate("/");

    }
    else{
        alert("Invalid credetials");
    }

  }
  const onChange=(e)=>{
    setinfo({...info,[e.target.name]:e.target.value})
  }
  return (
    <div className='Signup'>
    <div  className="form col-md-4">
    <form onSubmit={handlesubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" value={info.name} name="name" onChange={onChange} minLength={3} required />
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={info.email}  name="email" onChange={onChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" value={info.password} name="password" onChange={onChange} id="exampleInputPassword1"/>
        </div>
        <div className="form-group my-4">
          <label htmlFor="password">Confirm Password</label>
          <input type="password" className="form-control my-1" id="cpassword" name="cpassword"  placeholder="Confirm Password" onChange={onChange} minLength={5} required />
        </div>
        <button type="submit" className="btn btn-primary">Sign up</button>
    </form>
    {loading && <p className='mt-3' style={{justifyContent:'center',display:'flex',alignItems:'center'}}>Processing...Please wait for few seconds </p>}
    </div>
</div>
  )
}

export default Signup
