import React from 'react';
import './About.css';
import {motion } from 'framer-motion';



function About() {


    return(
        <motion.div className='AboutContainer'
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}       
        >
            <div className='Description'>
                <p>CarMarketPlace is a cutting-edge e-commerce platform that brings the convenience of online shopping to the automotive industry. 
                    It's a one-stop destination for individuals looking to buy or sell new and used cars. 
                    Whether you're a car enthusiast, a first-time buyer, or a seasoned seller, CarMarketPlace offers a seamless and secure online experience.</p>
            </div>
        </motion.div>
    );
}

export default About;
