import React, {useState ,useEffect} from "react";
import { motion } from 'framer-motion';
import './EditCar.css';
import { useVariablesValue } from "./Context";
import axios from "axios";



function EditCar() {

    const Colors = ["Black" , "White" , "Pink" , "Red", "Green", "Blue" , "Gold"];
    const Brands = ["BMW" , "Mercedes" , "Range Rover" , "Fiat", "Volkswagen", "Renault" , "Kia" , "Hyundai" , "Peugeot","Toyota","Dacia","Mahindra","Honda","Haval","Chevrolet","Audi","Jeep","Porsche"];
    const Currency = ["Dinar" , "Euro" , "Dollar"];
    const CurrencySign = ["DT","€","$"];
    const Years = [];
    for (let year = 2000; year <= 2023; year++) {
        Years.push(year);
    }

    const {signSuccess} = useVariablesValue();
    const {userID} = useVariablesValue();
    const {CarName} = useVariablesValue();
    const {CarYear} = useVariablesValue();
    const {CarPrice} = useVariablesValue();
    const {CarImage} = useVariablesValue();
    const {CarBrand} = useVariablesValue();
    const {CarCurrency} = useVariablesValue();
    const {CarColor} = useVariablesValue();
    const {CarMileage} = useVariablesValue();
    const {CarDescription} = useVariablesValue();
    const {CarFiscalPower} = useVariablesValue();
    const {CarFuel} = useVariablesValue();
    const {CarCylinder} = useVariablesValue();
    const {CarNumberOfImages , setCarNumberOfImages} = useVariablesValue();
    const {CarID} = useVariablesValue();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedYear , setSelectedYear] = useState(CarYear);
    const [selectedColor , setSelectedColor] = useState(CarColor);
    const [selectedBrand , setSelectedBrand] = useState(CarBrand);
    const [selectedCurrency , setSelectedCurrency] = useState(Currency[CurrencySign.indexOf(CarCurrency)]);
    const [eneterdName , setEneterdName] = useState(CarName);
    const [enteredPrice , setEnteredPrice] = useState(CarPrice);
    const [selectedImage , setSelectedImage] = useState(null);
    const [eneterdMiles , setEneterdMiles] = useState(CarMileage);
    const [enteredDescription , setEnteredDescription] = useState(CarDescription);
    const [enteredFuel , setEnteredFuel] = useState(CarFuel);
    const [enteredCylinder , setEnteredCylinder] = useState(CarCylinder);
    const [enteredFiscalPower , setEnteredFiscalPower] = useState(CarFiscalPower);
    const [hasMaxSet, setHasMaxSet] = useState(false);


    const previousImage = () => {
        setCurrentImageIndex(currentImageIndex - 1);
    };

    const nextImage = () => {
        setCurrentImageIndex(currentImageIndex + 1);
    };


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
        setSelectedImage(event.target.files[0]);
        if(event.target.files[0] == null){
            setCarNumberOfImages(CarNumberOfImages + -1);
            setHasMaxSet(false); 
        }
        if(!hasMaxSet){
            setCarNumberOfImages(CarNumberOfImages + 1);
            setHasMaxSet(true);
        }
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
    

    
    const CarEditSubmit = async (e) => {
        e.preventDefault();
        if(signSuccess){
            const carId = CarID;
            if (selectedImage !== null){
                const Iurl = 'http://localhost/testpage/src/editNumberOfImages.php';
                let IData = new FormData();
                IData.append('user_id', userID);
                IData.append('ImagePath', selectedImage);
                IData.append('car_name', CarName);
                IData.append('NumberOfImages', CarNumberOfImages);
                IData.append('car_ID', carId); 
                await axios.post(Iurl, IData);
            }
            const enteredCurrency = CurrencySign[Currency.indexOf(selectedCurrency)];
            const url = 'http://localhost/testpage/src/editCar.php';
            let fData = new FormData();
            fData.append('brand', selectedBrand);
            fData.append('name', eneterdName);
            fData.append('Price', enteredPrice);
            fData.append('Currency', enteredCurrency);
            fData.append('mileage', eneterdMiles);
            fData.append('Year', selectedYear);
            fData.append('color', selectedColor);
            fData.append('description', enteredDescription);
            fData.append('Fuel', enteredFuel);
            fData.append('cylinder', enteredCylinder);
            fData.append('FiscalPower', enteredFiscalPower); 
            fData.append('car_ID', CarID);
            const response = await axios.post(url, fData);
            if(response.data.carModified){
                window.location.href = '/myCars';
            };
        }
    };
    console.log("CarNumberOfImages : " +  CarNumberOfImages);
    const CarDeleteSubmit = async (e) => {
        e.preventDefault();
        const Durl = 'http://localhost/testpage/src/deleteCar&EditUser.php';
        let dData = new FormData();
        setCarNumberOfImages(0);
        dData.append('car_ID', CarID);
        dData.append('user_id', userID);
        dData.append('CarImage', CarImage);
        dData.append('CarNumberOfImages', CarNumberOfImages);
        dData.append('CarName', CarName);
        const response1 = await axios.post(Durl, dData);
        if(response1.data.carDeleted){
            window.location.href = '/myCars';
        };
    };


    const CarImageArray = CarImage.split('');
    CarImageArray[CarImageArray.length - 5] = currentImageIndex.toString();
    const CarImagePath =  CarImageArray.join('');

    useEffect(() => {
        const redirectToAnotherPage = () => {
          window.location.href = '/myCars';
        };
    
        window.onload = redirectToAnotherPage;
    
        return () => {
          window.onload = null;
        };
      }, []);

    return (
        <motion.div className="EditCar_Container"
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}   
        >
            <div className="CarImageEdit">
                {currentImageIndex !== 0 ? <button className="ChangeImg" id="PrevImg" onClick={previousImage}>◀</button> : null}
                <img  src={CarImagePath}  alt="Car" />
                {currentImageIndex  < CarNumberOfImages - 1 ? <button className="ChangeImg" id="NextImg" onClick={nextImage}>▶</button> : null}
                <button className="Delete_Car_Btn" onClick={CarDeleteSubmit}>Remove Car</button>
            </div>
            <div className="Car_Edit_Container">
                <span>Edit Your Car Information</span>
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
                <button id='Car_Submit_Btn' onClick={CarEditSubmit}> Submit</button>
            </div>
            <div id ="CarImageSection">
                <span id="AddCarImg">Add Another Car Image</span>
                <input type="file"  id="addImg" accept="image/*" onChange={changeImage} />
            </div>
        </motion.div>
    );
}



export default EditCar;