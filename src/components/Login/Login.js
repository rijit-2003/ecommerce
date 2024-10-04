import React,{useState} from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch ,useSelector} from 'react-redux';
import { bindActionCreators } from 'redux';
import { logincreator } from '../state';
import BASE_URL from '../../config';
import Loader from '../Loader';
const Login = () => {
    const dispatch=useDispatch();
    const {addlocalstorage,removelocalstorage}=bindActionCreators(logincreator,dispatch);
    const loggedin=useSelector(state=>state.loggedin);
    const [loading,setLoading]=useState(false);
    const [info,setinfo]=useState({email:"",password:""})
    const host=BASE_URL;
    let navigate=useNavigate()
    const handlesubmit=async(e)=>{
        e.preventDefault();
        setLoading(true); 
        const response=await fetch(`${host}/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email:info.email,password:info.password})
        })
        setLoading(false);
        const json= await response.json();
       
        if(json.newuser){
            alert("No account exist for this email....You need to sign up")
            navigate("/api/auth/signup");
        }
        else if(json.success){
            localStorage.setItem('token',json.authtoken);
            localStorage.setItem('name',json.name);
            addlocalstorage();
            navigate("/");
            alert("Logged in successfully");
        }
        else {
            alert("Invalid credentials");
        }
    }
    const onChange=(e)=>{
        setinfo({...info,[e.target.name]:e.target.value})
    }

    return (
        <div className='Login'>
            {/* <img src="https://t3.ftcdn.net/jpg/03/48/55/20/360_F_348552050_uSbrANL65DNj21FbaCeswpM33mat1Wll.jpg" alt="" style={{position:'relative'}} /> */}
            <div  className="formclass col-md-4" >
            
            <form onSubmit={handlesubmit}>
                <div className="mb-4 ">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={info.email} name="email" onChange={onChange} aria-describedby="emailHelp"/>
                </div>
                <div className="mb-4 ">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" value={info.password} name="password" onChange={onChange} id="exampleInputPassword1"/>
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
            </form>
            {loading && <p className='mt-3' style={{justifyContent:'center',display:'flex',alignItems:'center'}}>Processing...Please wait for few seconds </p>}
            
            </div>
        </div>
    )
}

export default Login
