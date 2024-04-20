import { createContext, useContext, useState , useEffect} from 'react';

const VariablesContext = createContext();

export const VariabalesProvider = ({ children }) => {
  const [signSuccess, setSignSuccess] = useState(false);
  const [isSideBarOpen, setisSideBarIsOpen] = useState(false);
  const [CarID, setCarID] = useState(0);
  const [CarName, setCarName] = useState("None");
  const [CarYear , setCarYear] = useState("None");
  const [CarPrice , setCarPrice] = useState(0);
  const [CarImage, setCarImage] = useState("None");
  const [CarBrand, setCarBrand] = useState("None");
  const [CarCurrency , setCarCurrency] = useState("None");
  const [CarColor , setCarColor] = useState("None");
  const [CarMileage, setCarMileage] = useState(0);
  const [CarDescription, setCarDescription] = useState("None");
  const [CarCylinder, setCarCylinder] = useState(0);
  const [CarFiscalPower, setCarFiscalPower] = useState(0);
  const [CarFuel, setCarFuel] = useState("None");
  const [CarNumberOfImages, setCarNumberOfImages] = useState(0);
  const [userName, setUserName] = useState("None");
  const [userLastName, setUserLastName] = useState("None");
  const [userID, setUserID] = useState(0);

  const keysToRemove = ['signSuccess', 'isSideBarOpen', 'CarName' , 'CarYear', 'CarPrice' , 'CarImage' , 'userName' , 'userLastName', 'userID', 'CarBrand' , 'CarCurrency', 'CarColor', 'CarMileage', 'CarDescription', 'CarNumberOfImages' , 'CarID' ,'CarCylinder' , 'CarFuel' , 'CarFiscalPower'];
  keysToRemove.forEach(key => {
    const value = localStorage.getItem(key);
    if (value === 'undefined') { 
      localStorage.removeItem(key);
    }
  });


  useEffect(() => {
    const storedSignSuccess = JSON.parse(localStorage.getItem('signSuccess'));
    if (storedSignSuccess !== null && storedSignSuccess !== undefined) {
      setSignSuccess(storedSignSuccess);
    }

    const storedUserName = localStorage.getItem('userName');
    if (storedUserName !== null && storedUserName !== undefined) {
      setUserName(storedUserName);
    }

    const storedUserLastName = localStorage.getItem('userLastName');
    if (storedUserLastName !== null && storedUserLastName !== undefined) {
      setUserLastName(storedUserLastName);
    }

    const storedUserID = JSON.parse(localStorage.getItem('userID'));
    if (storedUserID !== null && storedUserID !== undefined) {
      setUserID(parseInt(storedUserID, 10));
    }

    const storedCarYear = localStorage.getItem('carYear');
    if (storedCarYear !== null && storedCarYear !== undefined) {
      setCarYear(storedCarYear);
    }

    const storedCarPrice = localStorage.getItem('carPrice');
    if (storedCarPrice !== null && storedCarPrice !== undefined) {
      setCarPrice(parseInt(storedCarPrice, 10));
    }

    const storedCarName = localStorage.getItem('carName');
    if (storedCarName !== null && storedCarName !== undefined) {
      setCarImage(storedCarName);
    }

    const storedCarImage = localStorage.getItem('carImage');
    if (storedCarImage !== null && storedCarImage !== undefined) {
      setCarImage(storedCarImage);
    }

    const storedCarBrand = localStorage.getItem('CarBrand');
    if (storedCarBrand !== null && storedCarBrand !== undefined) {
      setCarBrand(storedCarBrand);
    }

    const storedCarCurrency = localStorage.getItem('CarCurrency');
    if (storedCarCurrency !== null && storedCarCurrency !== undefined) {
      setCarCurrency(storedCarCurrency);
    }
    
    const storedCarColor = localStorage.getItem('CarColor');
    if (storedCarColor !== null && storedCarColor !== undefined) {
      setCarColor(storedCarColor);
    }

    const storedCarMileage = localStorage.getItem('CarMileage');
    if (storedCarMileage !== null && storedCarMileage !== undefined) {
      setCarMileage(parseInt(storedCarMileage, 10));
    }

    const storedCarDescription = localStorage.getItem('CarDescription');
    if (storedCarDescription !== null && storedCarDescription !== undefined) {
      setCarDescription(storedCarDescription);
    }

    const storedCarNumberOfImages = localStorage.getItem('CarNumberOfImages');
    if (storedCarNumberOfImages !== null && storedCarNumberOfImages !== undefined) {
      setCarNumberOfImages(parseInt(storedCarNumberOfImages, 10));
    }

    const storedCarID = localStorage.getItem('CarID');
    if (storedCarID !== null && storedCarID !== undefined) {
      setCarID(parseInt(storedCarID, 10));
    }
    const storedCarCylinder = localStorage.getItem('CarCylinder');
    if (storedCarCylinder !== null && storedCarCylinder !== undefined) {
      setCarCylinder(parseInt(storedCarCylinder, 10));
    }
    const storedCarFiscalPower = localStorage.getItem('CarFiscalPower');
    if (storedCarFiscalPower !== null && storedCarFiscalPower !== undefined) {
      setCarFiscalPower(parseInt(storedCarFiscalPower, 10));
    }

    const storedCarFuel = localStorage.getItem('CarFuel');
    if (storedCarFuel !== null && storedCarFuel !== undefined) {
      setCarFuel(parseInt(storedCarFuel, 10));
    }

  }, [setCarCylinder,setCarFiscalPower,setCarFuel,setSignSuccess , setCarName , setCarPrice , setCarImage , setUserID , setUserLastName , setUserName , setCarBrand , setCarCurrency ,setCarColor , setCarMileage , setCarDescription , setCarNumberOfImages , setCarID]);

  useEffect(() => {
    if (signSuccess !== undefined && signSuccess !== null) {
      localStorage.setItem('signSuccess', JSON.stringify(signSuccess));
    }
  }, [signSuccess]);
  
  useEffect(() => {
    if (userName !== undefined && userName !== null) {
      localStorage.setItem('userName', userName);
    }
  }, [userName]);
  
  useEffect(() => {
    if (userLastName !== undefined && userLastName !== null) {
      localStorage.setItem('userLastName', userLastName);
    }
  }, [userLastName]);
  
  useEffect(() => {
    if (userID !== undefined && userID !== null) {
      localStorage.setItem('userID', JSON.stringify(userID));
    }
  }, [userID]);
  
  useEffect(() => {
    if (CarYear !== undefined && CarYear !== null) {
      localStorage.setItem('carYear', CarYear);
    }
  }, [CarYear]);
  
  useEffect(() => {
    if (CarPrice !== undefined && CarPrice !== null) {
      localStorage.setItem('carPrice', CarPrice);
    }
  }, [CarPrice]);
  
  useEffect(() => {
    if (CarImage !== undefined && CarImage !== null) {
      localStorage.setItem('carImage', CarImage);
    }
  }, [CarImage]);
  
  useEffect(() => {
    if (CarName !== undefined && CarName !== null) {
      localStorage.setItem('carName', CarName);
    }
  }, [CarName]);

  useEffect(() => {
    if (CarBrand !== undefined && CarBrand !== null) {
      localStorage.setItem('CarBrand', CarBrand);
    }
  }, [CarBrand]);

  useEffect(() => {
    if (CarCurrency !== undefined && CarCurrency !== null) {
      localStorage.setItem('CarCurrency', CarCurrency);
    }
  }, [CarCurrency]);

  useEffect(() => {
    if (CarColor !== undefined && CarColor !== null) {
      localStorage.setItem('CarColor', CarColor);
    }
  }, [CarColor]);

  useEffect(() => {
    if (CarMileage !== undefined && CarMileage !== null) {
      localStorage.setItem('CarMileage', CarMileage);
    }
  }, [CarMileage]);

  useEffect(() => {
    if (CarNumberOfImages !== undefined && CarNumberOfImages !== null) {
      localStorage.setItem('CarNumberOfImages', CarNumberOfImages);
    }
  }, [CarNumberOfImages]);

  useEffect(() => {
    if (CarDescription !== undefined && CarDescription !== null) {
      localStorage.setItem('CarDescription', CarDescription);
    }
  }, [CarDescription]);

  useEffect(() => {
    if (CarID !== undefined && CarID !== null) {
      localStorage.setItem('CarID', CarID);
    }
  }, [CarID]);

  useEffect(() => {
    if (CarCylinder !== undefined && CarCylinder !== null) {
      localStorage.setItem('CarCylinder', CarCylinder);
    }
  }, [CarCylinder]);

  useEffect(() => {
    if (CarFiscalPower !== undefined && CarFiscalPower !== null) {
      localStorage.setItem('CarFiscalPower', CarFiscalPower);
    }
  }, [CarFiscalPower]);

  useEffect(() => {
    if (CarFuel !== undefined && CarFuel !== null) {
      localStorage.setItem('CarFuel', CarFuel);
    }
  }, [CarFuel]);

  return (
    <VariablesContext.Provider value={{ signSuccess, setSignSuccess, isSideBarOpen, setisSideBarIsOpen , CarName , setCarName , 
      CarYear , setCarYear , CarPrice , setCarPrice , CarImage, setCarImage  ,userName , setUserName ,
      userLastName , setUserLastName , userID , setUserID , CarBrand ,setCarBrand , CarCurrency ,setCarCurrency,CarColor  , setCarColor
      , CarMileage, setCarMileage ,CarDescription , setCarDescription, CarNumberOfImages, setCarNumberOfImages, CarID, setCarID ,
      CarCylinder , setCarCylinder , CarFiscalPower , setCarFiscalPower , CarFuel , setCarFuel

    }}>
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariablesValue = () => {
  return useContext(VariablesContext);
};