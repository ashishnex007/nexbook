import React from 'react'
import "../components_css/Navbar.css"
import { useNavigate , Link} from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem("token")
    navigate("/login")
  }
  return (
    <>
    <header className="header">
        <h1 className='logo'>NexBook</h1>
        <nav className='navbar'>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            {!localStorage.getItem("token")?<>
            <Link to='/login' className='button'>Log In</Link>
            <Link to='/signup' className='button'>Signup</Link>
            </>:<button onClick={handleLogout} className="logout">Logout</button>}
        </nav>
    </header>
    </>
  )
}

export default Navbar
