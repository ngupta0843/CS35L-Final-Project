import React, {useState} from 'react';
import './Login.css';
import user_icon from './Assets/person.png'
import pw_icon from './Assets/password.png'
import email_icon from './Assets/email.png'

const Login = () => {

    const[action, setAction] = useState("Login");
    return (
        <div className='container'>
            <div className="header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="inputs">
                {action==="Login"?<div></div>:
                    <div className="input">
                        <img src={user_icon} alt=""/>
                        <input type="name" placeholder='Name'/>
                    </div>
                }

                <div className="input">
                    <img src={email_icon} alt=""/>
                    <input type="email" placeholder='Email ID'/>
                </div>

                <div className="input">
                    <img src={pw_icon} alt=""/>
                    <input type="password" placeholder='Password'/>
                </div>
                {action==="Sign Up"?<div></div>:
                    <div 
                        className="forgot-password">Lost Password? 
                        <span> Click Here</span>
                    </div>
                }
                <div className="submit-container">
                    <div 
                        className={action==="Login"?"submit gray":"submit"} 
                        onClick={()=>{setAction("Sign Up")}}>
                        Sign Up
                    </div>
                    <div 
                        className={action==="Sign Up"?"submit gray":"submit"} 
                        onClick={()=>{setAction("Login")}}>
                        Login
                    </div>
                </div>

                </div>
        </div>
  );
}

export default Login