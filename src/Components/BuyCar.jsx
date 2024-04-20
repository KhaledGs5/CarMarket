import React, {useState , useEffect} from "react";
import { motion } from 'framer-motion';
import './BuyCar.css'
import axios from "axios";
import { useVariablesValue } from "./Context";


function BuyCar() {
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');
    const [name, setName] = useState('');
    const {CarID} = useVariablesValue();
    const [data , setData] = useState([]);
    const {userID} = useVariablesValue();
    const {CarImage} = useVariablesValue();
    const {CarNumberOfImages} = useVariablesValue();
    const {CarName} = useVariablesValue();
    const {setCarNumberOfImages} = useVariablesValue();
    const [Bought, setBought] = useState(false);
    let owner;
  

    const ChangeCardNumber = (event) => {
        const newValue = event.target.value;
        if (newValue.length <= 12) {
            setCardNumber(newValue);
        }
      };
      
    useEffect(() => {
        axios.get('http://localhost/testpage/src/data.php')
          .then(response => {
            setData(response.data);
          });
    }, [setData]);

    const car = data.find((val) => val.id === CarID);
    if (car) {
         owner = car.OwnerId;
    }
    const CofirmBuy = async (e) => {
        if(cardNumber !== '' && expiry !== '' && cvv !== '' && name !== '') {
            let CardData = new FormData();
            CardData.append('car_ID', CarID);
            CardData.append('CarImage', CarImage);
            CardData.append('CarNumberOfImages', CarNumberOfImages);
            CardData.append('CarName', CarName);
            CardData.append('owner_Id', owner);
            CardData.append('user_id', userID);
            const Bcurl = 'http://localhost/testpage/src/addToUserBoughtCars.php';
            await axios.post(Bcurl , CardData);
            const Durl = 'http://localhost/testpage/src/deleteCar&Owner.php';
            const response1 = await axios.post(Durl, CardData);
            if(response1.data.carDeleted){
                setBought(true);
                setCarNumberOfImages(0);
            }else{
                setBought(false);
            };
        }else{
            alert('Fill Everything Please');
        }
    }; 

    const CancelBuy = () => {
        window.location.href = '/products';
    };

    const BackToHome = () => {
        window.location.href = '/';
    };

    return (
        <motion.div className="buyCar_Container"
        initial={{opacity: 0}}
        animate={{opacity: 1 , transition : {duration: 0.5}}}
        exit={{opacity: 0}}>
            {!Bought ? 
                <div id="buy_container">
                <div id="buycartlt">Enter Your Card Information</div>
                    <form id="frmbuycar">
                        <input
                            type="number"
                            name="cardNumber"
                            placeholder="Card Number"
                            maxLength="12"
                            value={cardNumber}
                            onChange={ChangeCardNumber}
                            required
                        />
    
                        <input
                            type="text"
                            name="name"
                            placeholder="Cardholder Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
    
                        <input
                            type="tel"
                            name="expiry"
                            placeholder="MM/YY Expiry"
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            required
                        />
    
                        <input
                            type="tel"
                            name="cvv"
                            placeholder="CVV"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            required
                        />
                    </form>
                    <div>
                        <button className="BuyCarBtn" onClick={CofirmBuy}>Confirm</button>
                        <button className="BuyCarBtn" onClick={CancelBuy}>Cancel</button>
                    </div>
                </div> :
                <>
                <div className="SuccessBuy">You successfully buy this car</div>
                <button className="BackToHome" onClick={BackToHome}> Ok</button>
                </>
            }

        </motion.div>
    );
}


export default BuyCar;