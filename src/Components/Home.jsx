import React from 'react';
import './Home.css';
import {motion } from 'framer-motion';
import {useNavigate} from 'react-router-dom';
import { useVariablesValue } from './Context';


function Home() {

    const navigate = useNavigate();
    const {signSuccess} = useVariablesValue(false);
    
    const GoToAddCar = () => {
        navigate('/addCar');
    };

    const GoToCars = () => {
        navigate('/myCars');
    };


    const GoToProducts = () => {
        window.location.href = '/products' ;
    };

    const GoToSignUp = () => {
        navigate('/signup');
    };


    return(
        <motion.div className='HomeContainer'
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}       
        >   
            <span id='Welcoming_To_Page'>Welcome To CarMarketPlace</span>
            <div id = "Choose_Container">
                {signSuccess ? <button className="Choose_btn" onClick={GoToAddCar}>Add Car</button> : <button className="Choose_btn" onClick={GoToSignUp}>SignUp To Add Your Car</button>}
                {signSuccess ? <button className="Choose_btn" onClick={GoToCars}>See Your Cars</button> : null}
                <button className="Choose_btn" onClick={GoToProducts}>See Our Products</button>
            </div>
        </motion.div>
    );
}

export default Home;