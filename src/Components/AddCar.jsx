import React , {useState} from 'react';
import {motion } from 'framer-motion';
import './AddCar.css';
import axios from 'axios';
import { useVariablesValue } from "./Context";



function AddCar() {
    
    const {signSuccess} = useVariablesValue();
    const {userID} = useVariablesValue(0);

    const Years = [];
    for (let year = 2000; year <= 2023; year++) {
        Years.push(year);
    }
    const Colors = ["Black" , "White" , "Pink" , "Red", "Green", "Blue" , "Gold"];
    const Brands = ["BMW" , "Mercedes" , "Range Rover" , "Fiat", "Volkswagen", "Renault" , "Kia" , "Hyundai" , "Peugeot","Toyota","Dacia","Mahindra","Honda","Haval","Chevrolet","Audi","Jeep","Porsche"];
    const Currency = ["Dinar" , "Euro" , "Dollar"];
    const CurrencySign = ["DT","€","$"];

    const [selectedYear , setSelectedYear] = useState("");
    const [selectedColor , setSelectedColor] = useState("");
    const [selectedBrand , setSelectedBrand] = useState("");
    const [selectedCurrency , setSelectedCurrency] = useState("");
    const [eneterdName , setEneterdName] = useState("");
    const [enteredPrice , setEnteredPrice] = useState("");
    const [selectedImage , setSelectedImage] = useState(null);
    const [eneterdMiles , setEneterdMiles] = useState("");
    const [enteredDescription , setEnteredDescription] = useState("");
    const [enteredFuel , setEnteredFuel] = useState("");
    const [enteredCylinder , setEnteredCylinder] = useState("");
    const [enteredFiscalPower , setEnteredFiscalPower] = useState("");

    const {CarNumberOfImages , setCarNumberOfImages} = useVariablesValue(1);


    
    const changeYear = (event) => {
        setSelectedYear(event.target.value);
    };

    const changeColor = (event) => {
        setSelectedColor(event.target.value);
    };
    
    const changeBrand = (event) => {
        setSelectedBrand(event.target.value);
    };

    const changeCurrency = (event) => {
        setSelectedCurrency(event.target.value);
    };

    const changePrice = (event) => {
        setEnteredPrice(event.target.value);
    };

    const changeName = (event) => {
        setEneterdName(event.target.value);
    };

    const changeImage = (event) => {
        setCarNumberOfImages(1);
        setSelectedImage(event.target.files[0]);
    };

    const changeMileage = (event) => {
        setEneterdMiles(event.target.value);
    };

    const changeDescription = (event) => {
        setEnteredDescription(event.target.value);
    };

    const changeCylinder = (event) => {
        setEnteredCylinder(event.target.value);
    };

    const changeFiscalPower = (event) => {
        setEnteredFiscalPower(event.target.value);
    };
    
    const changeFuel = (event) => {
        setEnteredFuel(event.target.value);
    };
    console.log("selectedYear :" + selectedYear);
    console.log("selectedColor :" + selectedColor);
    console.log("selectedBrand :" + selectedBrand);
    console.log("selectedCurrency :" + selectedCurrency);
    console.log("eneterdName :" + eneterdName);
    console.log("selectedImage :" + selectedImage);
    console.log("eneterdMiles :" + eneterdMiles);
    console.log("enteredDescription :" + enteredDescription);
    console.log("enteredFuel :" + enteredFuel);
    console.log("enteredCylinder :" + enteredCylinder);
    console.log("enteredFiscalPower :" + enteredFiscalPower);
    console.log("userID :" + userID);

    const CarSubmit = async (e) => {
        e.preventDefault();
        if(signSuccess){ 
            setCarNumberOfImages(1);
            const enteredCurrency = CurrencySign[Currency.indexOf(selectedCurrency)];
            const url = 'http://localhost/testpage/src/addtodata.php';
            let fData = new FormData();
            fData.append('brand', selectedBrand);
            fData.append('name', eneterdName);
            fData.append('Price', enteredPrice);
            fData.append('Currency', enteredCurrency);
            fData.append('mileage', eneterdMiles);
            fData.append('Year', selectedYear);
            fData.append('color', selectedColor);
            fData.append('description', enteredDescription);
            fData.append('ImagePath', selectedImage); 
            fData.append('Fuel', enteredFuel);
            fData.append('cylinder', enteredCylinder);
            fData.append('FiscalPower', enteredFiscalPower); 
            fData.append('userid' , userID);
            const response = await axios.post(url, fData);
            const carId = response.data.car_id; 
            const Userurl = 'http://localhost/testpage/src/addtousers.php';
            let UfData = new FormData();
            UfData.append('user_id', userID);
            UfData.append('car_id', carId); 
            await axios.post(Userurl, UfData);
            console.log("response.data.carAdded :" + response.data.carAdded);
            console.log("response.data.car_id :" + response.data.car_id);
            if(response.data.carAdded){
                console.log("carId :" + carId);
                let fData = new FormData();
                fData.append('NumberOfImages', CarNumberOfImages);
                fData.append('car_ID', carId); 
                await axios.post('http://localhost/testpage/src/editNumberOfImages.php', fData);
                window.location.href = './myCars';
            };
        }
    };
    console.log("CarNumberOfImages :" + CarNumberOfImages);
    
    return (
        <motion.div className='addCar_Container'
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}} 
        >
            <div className='Car_Information_Container'>
                <span>Enter Your Car Information</span>
                <select id='dataSelect' name='brand' value={selectedBrand} onChange={changeBrand}>
                 <option value="">Brand</option>
                    {Brands.map((brand) => (
                    <option key={brand} value={brand}>
                        {brand}
                    </option>))}
                </select>
                <input type="text" name='name' placeholder='Add Car Name' value={eneterdName} onChange={changeName}/>
                <div id="addCarPrice"> <input type="number" name='Price' placeholder='Add Car Price' value={enteredPrice} onChange={changePrice}/> 
                <select id="currencySelect" value={selectedCurrency}  onChange={changeCurrency}>
                    <option value="">Currency</option>
                    {Currency.map((Curr) => (
                    <option key={Curr} value={Curr}>
                        {Curr}
                    </option>))}
                </select></div>
                <input type="number" name='mileage' placeholder='Add Car Mileage' value={eneterdMiles} onChange={changeMileage}/>
                <select id='dataSelect' name='Year' value={selectedYear} onChange={changeYear}>
                <option value="">Year</option>
                    {Years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>))}
                </select>
                <select id='dataSelect' name='Color' value={selectedColor} onChange={changeColor}>
                <option value="">Color</option>
                    {Colors.map((color) => (
                    <option key={color} value={color}>
                        {color}
                    </option>))}
                </select>
                <input type="number" name='cylinder' placeholder='Add Car Cylinder' value={enteredCylinder} onChange={changeCylinder}/>
                <input type="number" name='FiscalPower' placeholder='Add Car Fiscal Power' value={enteredFiscalPower} onChange={changeFiscalPower}/>
                <input type="text" name='Fuel' placeholder='Add Car Fuel' value={enteredFuel} onChange={changeFuel}/>
                <input type="text" name='description' placeholder='Add Car Description' value={enteredDescription} onChange={changeDescription}/>
                <button id='Car_Submit_Btn' onClick={CarSubmit}> Submit</button>
            </div>
            <div id ="CarImageSection">
                <span id="AddCarImg">Add Your Car Image</span>
                <input type="file"  id="addImg" accept="image/*" onChange={changeImage} />
            </div>
        </motion.div>
    );
}


export default AddCar;