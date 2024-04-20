import React from "react";
import './SignOut.css';
import {motion } from 'framer-motion';
import { useVariablesValue } from "./Context";
function SignOut() {

  const {setSignSuccess} = useVariablesValue(false);
  
  const signout = () => {
    setSignSuccess(false);
    window.location.href = './signup' ;
  };

  const GoToProducts = () => {
    window.location.href = './products';
  };
  
  const GoToAddCar = () => {
    window.location.href = './addCar';
  };
     
    return (
        <motion.div className='SignOutContainer'
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}       
        >
            <span id = "WelcomingSpan">Thanks for joining us! Your shopping journey begins now</span>
            <div id = "Choose_Container">
                <button className="Choose_btn" onClick={signout}>Sign Out</button>
                <button className="Choose_btn" onClick={GoToAddCar}>Add Car</button>
                <button className="Choose_btn" onClick={GoToProducts}>See Products</button>
            </div>
        </motion.div>  
    );

}
export default SignOut;