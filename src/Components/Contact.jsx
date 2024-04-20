import React from 'react';
import './Contact.css';
import Mailicon from './Images/email.png'
import Phoneicon from './Images/telephone.png'
import Facebookicon from './Images/facebook-circular-logo.png'
import location from './Images/Location.jpg'
import {motion } from 'framer-motion';



function Contact() {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}              
        >
            <div className="ContactContainer">
                <span id = "ctlt">Let's Have A Talk</span>
                <div className="ContactBlocks">
                    <div  id='ContactMap'>
                    <span>Our Location</span>
                    <div className='Location'><img src={location} alt="" /></div>
                    </div>
                    <div  id='ContactInfo'>
                        <span>Contact Us</span>
                        <ul>
                            <li><img src={Phoneicon} alt="Phone" /> +216 50 424 900</li>
                            <li><img src={Mailicon} alt="Mail" /> Contact@gmail.com</li>
                            <li><img src={Facebookicon} alt="Facebook" /> Khaled Gassara</li>
                        </ul>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}



export default Contact;