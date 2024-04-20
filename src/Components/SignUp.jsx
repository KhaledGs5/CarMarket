import React, { useState } from 'react';
import axios from 'axios';
import { NavLink , useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVariablesValue } from "./Context";


function SignUp() {
  const {userName, setUserName} = useVariablesValue("");
  const {userLastName, setUserLastName} = useVariablesValue("");
  const {setUserID} = useVariablesValue(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gendre , setGendre]  = useState('Male');
  const [phoneNumber , setPhoneNumber]  = useState("");
  const {signSuccess , setSignSuccess} = useVariablesValue(false);
  const [OutMessage , setOutMessage] = useState("");
  const navigate = useNavigate();


  const signup = async (e) => {
    e.preventDefault(); 
    const url = 'http://localhost/testpage/src/signup.php';
    let fData = new FormData();
    fData.append('firstname', userName);
    fData.append('lastname', userLastName);
    fData.append('email', email);
    fData.append('password', password);
    fData.append('gendre' , gendre);
    fData.append('phoneNumber' , phoneNumber);
    const response = await axios.post(url, fData);
    setSignSuccess(response.data.isLoggedIn);
    setUserID(response.data.userId);
    
    if (!response.data.isLoggedIn) {
      setOutMessage("Please Enter Everything");
    } else {
      setOutMessage("");
    }
  };

  if (signSuccess){
        navigate('/signout');
  }else{
  return (
    <motion.div className='Form_Big_Container'
      initial={{opacity: 0}}
      animate={{opacity: 1 , transition : {duration: 0.5}}}
      exit={{opacity: 0}}  
    >
      <span id="ftlt">Sign Up</span>
      <div className = "container">
          <div className = "form_container">
              <form id="frm">
                  <div className="form_holder">
                      <input type="text" placeholder ="First Name" name="firstname" value={userName} onChange={(e) => setUserName(e.target.value)} required />
                      <input type="text" placeholder="Last Name" name="lastname" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} required />
                      <div id="Gendre_Choose">
                        <span>Gendre : &nbsp; &nbsp;&nbsp;</span>
                        <span>Male  &nbsp;</span>
                        <input className='checkboxsignup' type="checkbox" checked={gendre === 'Male'} name='Male' value={'Male'} onChange={(e) => {setGendre(e.target.value)}} required/>&nbsp;&nbsp;
                        <span>Female  &nbsp;</span>
                        <input className='checkboxsignup' type="checkbox" checked={gendre === 'Female'} name='Female' value={'Female'} onChange={(e) => {setGendre(e.target.value)}} required/>
                      </div>
                      <input type="number"  placeholder='Phone Number' name="phoneNumber"  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
                      <input type="text" placeholder="Email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                      <input type="password" placeholder="Password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <button id="submit_btn" onClick={signup}>
                    Sign Up
                  </button>
                  <p id= "OutMessage">{OutMessage}</p> 
              </form>
          </div>
          <button id="Swap_btn"><NavLink to='/signin' id="Swap_btn_txt">Sign In</NavLink></button>
      </div>
    </motion.div>
  );
  }
}
export default SignUp;
