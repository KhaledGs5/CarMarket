import React,{useState} from 'react';
import axios from 'axios';
import './Form.css';
import {motion } from 'framer-motion';
import { NavLink , useNavigate} from "react-router-dom";
import { useVariablesValue } from './Context';


function SignIn() {
    const {setUserName} = useVariablesValue("");
    const {setUserLastName} = useVariablesValue("");
    const {setUserID} = useVariablesValue(0);
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const {signSuccess , setSignSuccess} = useVariablesValue(false);
    const [OutMessage , setOutMessage] = useState("");
    const navigate = useNavigate();

    const login = (e) => {
        e.preventDefault(); 
        const url = 'http://localhost/testpage/src/login.php';
        let fData = new FormData();
        fData.append('email', email);
        fData.append('password', password);
        axios.post(url , fData).then(response=> {
        setSignSuccess(response.data.isLoggedIn)
        setUserName(response.data.userName)
        setUserLastName(response.data.userLastName)
        setUserID(response.data.userId)
        });
        if(!signSuccess) {
            setOutMessage("Wrong Password Or Email Try Again!! ")
        }else{
            setOutMessage("");
        }
    }
    if (signSuccess){
        navigate('/signout');
    }else{
    return (
        <motion.div className='Form_Big_Container'
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}   
        >
            <span id="ftlt">Sign In</span>
            <div className = "container">
                <div className = "form_container">
                    <form id="frm">
                        <div className="form_holder">
                            <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                        </div>
                        <button id="submit_btn" onClick={login}>Sign In</button>
                        <p id= "OutMessage">{OutMessage}</p> 
                    </form>
                </div>
                <button id="Swap_btn"><NavLink to="/signup" id="Swap_btn_txt">Sign Up</NavLink></button> 
            </div>
        </motion.div>
    );}
}

export default SignIn;