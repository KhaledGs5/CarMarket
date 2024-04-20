import React, { useState, useEffect} from 'react';
import './Products.css';
import searchIcon from './Images/search.png'
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useVariablesValue } from "./Context";
import axios from 'axios';


function Products() {

    const CurrencyValueEuroBase = [3.38 , 1 , 1.09];
    const CurrencyValueDollarBase = [3.09 , 0.92 , 1];
    const CurrencyValueDinarBase = [1 , 0.3 , 0.32];
    let CurrencyBase = [];
    let CurrencyIndex = 0;
    const Currency = ["Dinar" , "Euro" , "Dollar"];
    const CurrencySign = ["DT","€","$"];
    const [selectedCurrency , setSelectedCurrency] = useState("");
    const [data, setData] = useState([]);
    const [searcheditem, setSearchedItem] = useState("");
    const [EnteredItem , setEnteredItem] = useState("");
    const [isSearchBarShow, setSearchBarShow] = useState(true);
    const [prevScrollPos] = useState(window.pageYOffset);
    const [minPrice, setMinPrice] = useState(10);
    const [maxPrice, setMaxPrice] = useState(4000);
    const [maxFPower, setMaxFPower] = useState(1000);
    const [brandToggle , setBrandToggle] = useState(false);
    const [yearToggle , setYearToggle] = useState(false);
    const [FPowerToggle , setFPowerToggle] = useState(false);
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
    const [brandCheckedBoxes , setBrandCheckedBoxes] = useState({
        Fiat : false,
        BMW : false,
        Mercedes :  false,
        Land_Cruiser : false,
        Ferrari : false,
        Volskwagen : false,
        Audi : false,
        Range_Rover : false,
        Renault :false,
        Hyundai : false,
        Toyota :  false,
        Mahindra : false,
        Dacia : false,
        Honda : false,
        Haval : false,
        Chevrolet :  false,
        Jeep : false,
        Porsche : false
    });
    const [yearCheckedBoxes , setYearCheckedBoxes] = useState({
        "2000" : false,
        "2001" : false,
        "2002" :false,
        "2003" :false,
        "2004" :false,
        "2005" :false,
        "2006" :false,
        "2007" :false,
        "2008" :false,
        "2009" :false,
        "2010" :false,
        "2011" :false,
        "2012" :false,
        "2013" :false,
        "2014" :false,
        "2015" :false,
        "2016" :false,
        "2017" :false,
        "2018" :false,
        "2019" :false,
        "2020" :false,
        "2021" :false,
        "2022" :false,
        "2023" :false,
    });
    const [FPowerCheckedBoxes , setFPowerCheckedBoxes] = useState({
        "3" : false,
        "10" : false,
        "50" :false,
        "100" :false,
        "200" :false,
        "300" :false,
        "500" :false,
        "1000" :false,
    });
    const [FilterState, setFilterState] = useState(false);

    useEffect(() => {
        axios.get('http://localhost/testpage/src/data.php')
          .then(response => {
            setData(response.data);
          });
      }, []);
    useEffect(() => {
    const selectedFPowers = Object.keys(FPowerCheckedBoxes).filter((key) => FPowerCheckedBoxes[key]);
    if (selectedFPowers.length > 0) {
        const maxSelectedFPower = Math.max(...selectedFPowers.map(Number));
        setMaxFPower(maxSelectedFPower);
    } else {
        setMaxFPower(1000);
    }
    }, [FPowerCheckedBoxes]);
    const Navigate = useNavigate();

    const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
        if(prevScrollPos < currentScrollPos -150){
            setSearchBarShow(false);
        }else{
            setSearchBarShow(true);
        }
    };

    window.addEventListener('scroll', handleScroll);

    const ChangeSearchedItem = () => {
        setSearchedItem(EnteredItem);
    };
    const ChangeEnteredItem = (event) => {
        setEnteredItem(event.target.value);
    };
    
    const MinPriceChange = (e) => {
        setMinPrice(parseInt(e.target.value));
    };
    
      const MaxPriceChange = (e) => {
        setMaxPrice(parseInt(e.target.value));
    };

    const ChangeFilterState = () => {
        setFilterState(!FilterState);
    };
    
    const ToggleBrand = () => {
        setBrandToggle(!brandToggle);
    };

    const ToggleYear = () => {
        setYearToggle(!yearToggle);
    };

    const ToggleFPower = () => {
        setFPowerToggle(!FPowerToggle);
    };

    const GoToDescription = () => {
        Navigate('./cardescription');
    };

    const changeCurrency = (event) => {
        setSelectedCurrency(event.target.value);
    };
    console.log("maxFpower : "  + maxFPower);
    return(
        <motion.div className='ProductsContainer'
            initial={{opacity: 0}}
            animate={{opacity: 1 , transition : {duration: 0.5}}}
            exit={{opacity: 0}}       
        >
            <div className={`SearchBar_Container ${!isSearchBarShow ? 'Corner' : ''}`} >
                <button className='SearchBtn' onClick={ChangeSearchedItem}> <img src={searchIcon} alt="" /></button>
                <input type="search" className='SearchBar' placeholder='Search' value={EnteredItem} onChange={ChangeEnteredItem}/>
            </div>
            <div className='Products'>
                <div className='Filter_Container'>
                    <div className={`Filter_Btn_Container ${!isSearchBarShow ? 'NewPos' : ''}`}>
                        <button className= {`filter_btn ${!isSearchBarShow ? 'NewPos' : ''} ${FilterState ? 'Filtering' : ''}`} onClick={ChangeFilterState}>{!FilterState ? 'Filter' :'No Filter'}</button>
                        <select className="CurrencySelectProducts" value={selectedCurrency} onChange={changeCurrency}> 
                        <option value="">Currency</option>
                        {Currency.map((Curr) => (
                        <option key={Curr} value={Curr}>
                            {Curr}
                        </option>))}
                        </select>
                    </div>
                    <div className={`Filters ${!isSearchBarShow ? 'NewPos' : ''}`}>
                        <div className="Price_Range_Container">
                            <span className='Price_Range_Txt'>Price Range :</span>
                            <div className="Price-input">
                                <div className='fields'>
                                    <div className="field">
                                    <span>Min</span>
                                    <input
                                        type="number"
                                        value={minPrice}
                                        onChange={MinPriceChange}
                                    />
                                    </div>
                                    <div className="separator">-</div>
                                    <div className="field">
                                    <span>Max</span>
                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={MaxPriceChange}
                                    />
                                    </div>
                                </div>
                                <span>{'Currency: ' + (selectedCurrency !== '' ? selectedCurrency : 'Euro')}</span>
                            </div>
                        </div>
                        <div className={`Product_Brand_Container ${brandToggle? 'Opened' : ''}`} >
                            <div className='Product_Brand'>Brand</div>
                            <button className={`ToggleBrandBtn ${brandToggle? 'Opened' : ''}`} onClick={ToggleBrand}>▲</button>
                            {brandToggle ? <div className='Options'>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Fiat} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Fiat : !prevCheckedBoxes.Fiat,}))}/><span>Fiat</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Honda} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Honda : !prevCheckedBoxes.Honda,}))}/><span>Honda</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.BMW} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, BMW : !prevCheckedBoxes.BMW,}))}/><span>BMW</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Mercedes} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Mercedes : !prevCheckedBoxes.Mercedes,}))}/><span>Mercedes</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Land_Cruiser} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Land_Cruiser : !prevCheckedBoxes.Land_Cruiser,}))}/><span>Land Cruiser</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Ferrari} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Ferrari : !prevCheckedBoxes.Ferrari,}))}/><span>Ferrari</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Volkswagen} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Volkswagen : !prevCheckedBoxes.Volkswagen,}))}/><span>Volkswagen</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Renault} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Renault : !prevCheckedBoxes.Renault,}))}/><span>Renault</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Kia} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Kia : !prevCheckedBoxes.Kia,}))}/><span>Land Cruiser</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Hyundai} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Hyundai : !prevCheckedBoxes.Hyundai,}))}/><span>Hyundai</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Peugeot} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Peugeot : !prevCheckedBoxes.Peugeot,}))}/><span>Peugeot</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Toyota} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Toyota : !prevCheckedBoxes.Toyota,}))}/><span>Toyota</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Dacia} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Dacia : !prevCheckedBoxes.Dacia,}))}/><span>Dacia</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Mahindra} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Mahindra : !prevCheckedBoxes.Mahindra,}))}/><span>Mahindra</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Haval} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Haval : !prevCheckedBoxes.Haval,}))}/><span>Haval</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Chevrolet} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Chevrolet : !prevCheckedBoxes.Chevrolet,}))}/><span>Chevrolet</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Audi} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Audi : !prevCheckedBoxes.Audi,}))}/><span>Audi</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Jeep} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Jeep : !prevCheckedBoxes.Jeep,}))}/><span>Jeep</span></div>
                                <div className='Option'><input type="checkbox" checked={brandCheckedBoxes.Porsche} onChange={() => setBrandCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, Porsche : !prevCheckedBoxes.Porsche,}))}/><span>Porsche</span></div>
                            </div> : null}
                        </div>
                        <div className= {`Product_Year_Container ${yearToggle? 'Opened' : ''}`} >
                            <div className='Product_Year'>Year</div>
                            <button className={`ToggleYearBtn ${yearToggle? 'Opened' : ''}`} onClick={ToggleYear}>▲</button>
                            {yearToggle ? <div className='Options'>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2023"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2023" : !prevCheckedBoxes["2023"],}))}/><span>2023</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2022"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2022" : !prevCheckedBoxes["2022"],}))}/><span>2022</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2021"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2021" : !prevCheckedBoxes["2021"],}))}/><span>2021</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2020"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2020" : !prevCheckedBoxes["2020"],}))}/><span>2020</span></div>  
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2019"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2019" : !prevCheckedBoxes["2019"],}))}/><span>2019</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2018"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2018" : !prevCheckedBoxes["2018"],}))}/><span>2018</span></div>  
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2017"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2017" : !prevCheckedBoxes["2017"],}))}/><span>2017</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2016"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2016" : !prevCheckedBoxes["2016"],}))}/><span>2016</span></div>  
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2015"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2015" : !prevCheckedBoxes["2015"],}))}/><span>2015</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2014"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2014" : !prevCheckedBoxes["2014"],}))}/><span>2014</span></div>  
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2013"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2013" : !prevCheckedBoxes["2013"],}))}/><span>2013</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2012"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2012" : !prevCheckedBoxes["2012"],}))}/><span>2012</span></div> 
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2011"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2011" : !prevCheckedBoxes["2011"],}))}/><span>2011</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2010"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2010" : !prevCheckedBoxes["2010"],}))}/><span>2010</span></div>  
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2009"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2009" : !prevCheckedBoxes["2009"],}))}/><span>2009</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2008"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2008" : !prevCheckedBoxes["2008"],}))}/><span>2008</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2007"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2007" : !prevCheckedBoxes["2007"],}))}/><span>2007</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2006"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2006" : !prevCheckedBoxes["2006"],}))}/><span>2006</span></div>  
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2005"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2005" : !prevCheckedBoxes["2005"],}))}/><span>2005</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2004"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2004" : !prevCheckedBoxes["2004"],}))}/><span>2004</span></div> 
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2003"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2003" : !prevCheckedBoxes["2003"],}))}/><span>2003</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2002"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2002" : !prevCheckedBoxes["2002"],}))}/><span>2002</span></div> 
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2001"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2001" : !prevCheckedBoxes["2001"],}))}/><span>2001</span></div>
                                <div className='Option'><input type="checkbox" checked={yearCheckedBoxes["2000"]} onChange={() => setYearCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "2000" : !prevCheckedBoxes["2000"],}))}/><span>2000</span></div>                              
                            </div> : null}
                        </div>
                        <div className= {`Product_FPower_Container ${FPowerToggle? 'Opened' : ''}`} >
                            <div className='Product_FPower'>Max Fiscal Power</div>
                            <button className={`ToggleFPowerBtn ${FPowerToggle? 'Opened' : ''}`} onClick={ToggleFPower}>▲</button>
                            {FPowerToggle ? <div className='Options'>
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["3"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "3" : !prevCheckedBoxes["3"],}))}/><span>3</span></div>
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["10"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "10" : !prevCheckedBoxes["10"],}))}/><span>10</span></div>
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["50"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "50" : !prevCheckedBoxes["50"],}))}/><span>50</span></div>
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["100"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "100" : !prevCheckedBoxes["100"],}))}/><span>100</span></div>  
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["200"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "200" : !prevCheckedBoxes["200"],}))}/><span>200</span></div>
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["300"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "300" : !prevCheckedBoxes["300"],}))}/><span>300</span></div>  
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["500"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "500" : !prevCheckedBoxes["500"],}))}/><span>500</span></div>
                                <div className='Option'><input type="checkbox" checked={FPowerCheckedBoxes["1000"]} onChange={() => setFPowerCheckedBoxes((prevCheckedBoxes) => ({...prevCheckedBoxes, "1000" : !prevCheckedBoxes["1000"],}))}/><span>1000</span></div>                             
                            </div> : null}
                        </div>
                    </div>
                </div>
                <div className='Templates_Container'>
                    {
                        data.filter((val) => {
                            CurrencyIndex = Currency.indexOf(selectedCurrency) === -1 ? 1 : Currency.indexOf(selectedCurrency);
                            if(val.Currency === 'DT'){
                                CurrencyBase = CurrencyValueDinarBase;
                            }else if(val.Currency === '$'){
                                CurrencyBase = CurrencyValueDollarBase;
                            }else{
                                CurrencyBase = CurrencyValueEuroBase;
                            }
                            const nameMatch = val.name.toLowerCase().includes(searcheditem.toLowerCase());
                            const priceMatch = (minPrice === '' || (val.Price * CurrencyBase[CurrencyIndex]).toFixed(3) >= parseInt(minPrice)) && (maxPrice === '' || (val.Price * CurrencyBase[CurrencyIndex]).toFixed(3) <= parseInt(maxPrice));
                            const typeMatch = Object.keys(brandCheckedBoxes).some((checkbox) => brandCheckedBoxes[checkbox] && val.brand.toLowerCase().includes(checkbox.toLowerCase())) || Object.values(brandCheckedBoxes).every(value => value === false);
                            const yearMatch = Object.keys(yearCheckedBoxes).some((checkbox) => yearCheckedBoxes[checkbox] && val.Year.toLowerCase().includes(checkbox.toLowerCase())) || Object.values(yearCheckedBoxes).every(value => value === false);
                            const fiscalpowerMatch = Object.keys(FPowerCheckedBoxes).some(checkbox =>FPowerCheckedBoxes[checkbox] && val.fiscalpower < maxFPower) || Object.values(FPowerCheckedBoxes).every(value => value === false);
                            console.log("fiscalpowerMatch : "  + fiscalpowerMatch);
                            if (FilterState) {
                                return nameMatch && priceMatch && typeMatch && yearMatch && fiscalpowerMatch;
                            }else{
                                return nameMatch;
                            }
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
                                        GoToDescription();
                                    }}>
                                    <img src={val.ImagePath} alt="Car" />
                                    <h2>{val.name}</h2>
                                    <h3>{"Price : " + (val.Price * CurrencyBase[CurrencyIndex]).toFixed(3) + ' ' +CurrencySign[CurrencyIndex]}</h3>
                                    <h4>{"Year : "  + val.Year}</h4>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </motion.div>
    );
}



export default Products;