import React, { useState } from 'react'
import "../components_css/login.css"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [credentials, setCredentials] = useState({email:"",password:""})
    const navigate = useNavigate();

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const response = await fetch("https://nexbook.onrender.com/api/auth/login", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            //redirect
            localStorage.setItem('token',json.authToken);
            navigate("/");
        }else{
            alert("invalid credentials")
        }
    }

    const onChange = (e) =>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

  return (
    <div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
        <div className="container">
            <div className="form">
                <h2>Login Here</h2>
                <form  onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input type="email" name="email" value={credentials.email} onChange={onChange} placeholder="Email ID"/>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password"/>
                    </div>
                    <div className="inputBox">
                        <input type="submit" id="login" value="Login"/>
                    </div>
                    <p className="signup" >Don't have an Account?<a href="/signup" target="_self">Signup</a></p>
                </form>
            </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </div>
  )
}

export default Login
