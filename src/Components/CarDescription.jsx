import React, {useState , useEffect} from "react";
import { motion } from 'framer-motion';
import {useNavigate} from "react-router-dom"
import './CarDescription.css';
import { useVariablesValue } from "./Context";
import axios from "axios";



function CarDescription() {

    const Navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const {CarName} = useVariablesValue();
    const {CarYear} = useVariablesValue();
    const {CarPrice} = useVariablesValue();
    const {CarImage} = useVariablesValue();
    const {CarBrand} = useVariablesValue();
    const {CarCurrency} = useVariablesValue();
    const {CarColor} = useVariablesValue();
    const {CarMileage} = useVariablesValue();
    const {CarDescription} = useVariablesValue();
    const {CarNumberOfImages} = useVariablesValue();
    const {CarFiscalPower} = useVariablesValue();
    const {CarFuel} = useVariablesValue();
    const {CarCylinder} = useVariablesValue();
    const {CarID} = useVariablesValue();
    const {signSuccess} = useVariablesValue();
    const {userID} = useVariablesValue();
    const [data , setData] = useState([]);
    const [users , setUsers] = useState([]);
    let owner;
    let ownername;
    let owneremail;
    let ownerlname;
    let ownerphone;
    const previousImage = () => {
        setCurrentImageIndex(currentImageIndex - 1);
    };

    const nextImage = () => {
        setCurrentImageIndex(currentImageIndex + 1);
    };

    useEffect(() => {
        axios.get('http://localhost/testpage/src/users.php')
          .then(response => {
            setUsers(response.data);
          });
    }, []);

    console.log(users);
    useEffect(() => {
        axios.get('http://localhost/testpage/src/data.php')
          .then(response => {
            setData(response.data);
          });
    }, []);
    const car = data.find((val) => val.id === CarID);
    if (car) {
         owner = car.OwnerId;
    }
    const user = users.find((val) => val.id === owner);
    if(user) {
        ownername = user.firstname;
        ownerlname = user.lastname;
        ownerphone = user.phonenumber;
        owneremail = user.email;
    }

    const ReturnToProducts = () => {
        Navigate("/products");
    };
    const GoToBuy = () => {
        Navigate("./buyCar");
    };

    const CarImageArray = CarImage.split('');
    CarImageArray[CarImageArray.length - 5] = currentImageIndex.toString();
    const CarImagePath =  CarImageArray.join('');

    return (
        <motion.div className="carDescription_Container"
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}   
        >
            <div className="CarImage">
                {currentImageIndex !== 0 ? <button className="ChangeImg" id="PrevImg" onClick={previousImage}>◀</button> : null}
                <img  src={CarImagePath}  alt="Car" />
                {currentImageIndex  < CarNumberOfImages - 1 ? <button className="ChangeImg" id="NextImg" onClick={nextImage}>▶</button> : null}
            </div>
            <div className="data_container">
                <div className="Car_Informations">
                    <div className="Car_Description">
                        <div className="item"><div>Brand : &nbsp;</div>{CarBrand}</div>
                        <div className="item"><div>Name : &nbsp;</div>{CarName}</div>
                        <div className="item"><div>Price : &nbsp;</div>{CarPrice + ' ' + CarCurrency}</div>
                        <div className="item"><div>Mileage : &nbsp;</div>{CarMileage}</div>
                        <div className="item"><div>Color : &nbsp;</div>{CarColor}</div>
                        <div className="item"><div>Year : &nbsp;</div>{CarYear}</div>
                        <div className="item"><div>Fiscal Power : &nbsp;</div>{CarFiscalPower}</div>
                        <div className="item"><div>Fuel : &nbsp;</div>{CarFuel}</div>
                        <div className="item"><div>Cylinder : &nbsp;</div>{CarCylinder + "L"}</div>
                    </div>
                    <div className="litem"><div>Car Description : &nbsp;</div>{CarDescription}</div>
                </div>
                <div id='CarDescBtns'> 
                    {(parseInt(userID) !== parseInt(owner) && signSuccess) ? <button id= "BuyBtn" onClick={GoToBuy}>Buy</button> : <span className="Message">{signSuccess ?"Your Car" : <a href="/signup">You Must SignIn To Be Able To Buy A Car</a>}</span>}
                    <button id= "ReturnToProducts" onClick={ReturnToProducts}>Return</button>
                </div>
            </div>
            <div className="user_data_container">
                    <div className="uitem"><div>Owner Name : &nbsp;</div>{ownername}</div>
                    <div className="uitem"><div>Owner LastName : &nbsp;</div>{ownerlname}</div>
                    <div className="uitem"><div>Owner Email : &nbsp;</div>{owneremail}</div>
                    <div className="uitem"><div>Owner Phone : &nbsp;</div>{ownerphone}</div>
            </div>
        </motion.div>
    );
}



export default CarDescription;