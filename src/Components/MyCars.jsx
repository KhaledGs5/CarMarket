import React,{useEffect ,useState} from "react";
import {useNavigate} from 'react-router-dom';
import {motion } from 'framer-motion';
import './MyCars.css';
import { useVariablesValue } from "./Context";
import axios from "axios";


const MyCars = () => {

    const {userName} = useVariablesValue("");
    const {userLastName} = useVariablesValue("");
    const { userID } = useVariablesValue();
    const [data, setData] = useState([]);
    const [carIds , setCarIds] = useState([]);
    const {setCarName} = useVariablesValue('');
    const {setCarYear} = useVariablesValue('');
    const {setCarPrice} = useVariablesValue('');
    const {setCarImage} = useVariablesValue('');
    const {setCarBrand} = useVariablesValue('');
    const {setCarCurrency} = useVariablesValue('');
    const {setCarColor} = useVariablesValue('');
    const {setCarMileage} = useVariablesValue(0);
    const {setCarDescription} = useVariablesValue('');
    const {setCarNumberOfImages} = useVariablesValue(0);
    const {setCarFiscalPower} = useVariablesValue(0);
    const {setCarFuel} = useVariablesValue('');
    const {setCarCylinder} = useVariablesValue(0);
    const {setCarID} = useVariablesValue(0);

    const Navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost/testpage/src/data.php").then((response) => {
          setData(response.data);
        });
    
        const fetchUserCarIds = async () => {
          const url = "http://localhost/testpage/src/getUserCars.php";
          const uData = new FormData();
          uData.append("userID", userID);
            const response = await axios.post(url, uData);
            const CarIdArray = response.data.split(",");
            setCarIds(CarIdArray);
        };
    
        fetchUserCarIds();
      }, [userID]);
    
    const GoToEditCar = () => {
        Navigate('./EditCar');
    }
      
    return (
        <motion.div className='MyCars_Container'
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}} 
        >
            <span id="UserNameCars">{userName + ' ' + userLastName + '  Deployed Cars'}</span>
            <div className='Templates_Container'>
                {
                    data.filter((val) => { 
                        const idMatch = carIds.includes(val.id);
                        return idMatch;
                    }).map((val) =>{
                        return (
                            <div className='template' key={val.id} onClick={() => {
                                setCarName(val.name);
                                setCarYear(val.Year);
                                setCarPrice(val.Price);
                                setCarImage('/' + val.ImagePath);
                                setCarBrand(val.brand);
                                setCarCurrency(val.Currency);
                                setCarColor(val.color);
                                setCarMileage(val.mileage);
                                setCarDescription(val.description);
                                setCarNumberOfImages(parseInt(val.NumberOfImages, 10));
                                setCarFiscalPower(val.fiscalpower);
                                setCarFuel(val.fuel);
                                setCarCylinder(val.cylinder);
                                setCarID(val.id);
                                GoToEditCar();}}
                            >
                                <img src={val.ImagePath} alt="Car" />
                                <h2>{val.name}</h2>
                                <h3>{"Price : " + val.Price + ' ' + val.Currency}</h3>
                                <h4>{"Year : "  + val.Year}</h4>
                            </div>
                        );
                    })
                }
            </div>
        </motion.div>
    );
}


export default MyCars;