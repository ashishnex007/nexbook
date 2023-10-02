import React,{useState} from 'react';
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    const navigate = useNavigate();
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const {name,email,password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createUser", {
            method: "POST", 
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({name,email,password}) //632
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
    <>
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
                <h2>Signup now</h2>
                <form  onSubmit={handleSubmit}>
                    <div className="inputBox">
                        <input type="text" name="name" value={credentials.name} onChange={onChange} placeholder="Your good name :)"/>
                    </div>
                    <div className="inputBox">
                        <input type="email" name="email" value={credentials.email} onChange={onChange} placeholder="Email ID"/>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="password" value={credentials.password} onChange={onChange} placeholder="Password" minLength={5} required/>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="cpassword" value={credentials.cpassword} onChange={onChange} placeholder="Confirm Password" minLength={5} required/>
                    </div>
                    <div className="inputBox">
                        <input type="submit" id="signup" value="Signup"/>
                    </div>
                    <p className="signup" >Have an Account?<a href="/login" target="_self">Login</a></p>
                </form>
            </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
    </>
  )
}

export default Signup
