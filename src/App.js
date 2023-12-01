
import React  from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import {AnimatePresence } from 'framer-motion';
import SignUp from './Components/SignUp';
import Home from './Components/Home';
import SignIn from './Components/SignIn';
import Contact from './Components/Contact';
import SignOut from './Components/SignOut';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Products from './Components/Products';
import MyCars from './Components/MyCars';
import AddCar from './Components/AddCar';
import EditCar from './Components/EditCar';
import BuyCar from './Components/BuyCar';
import CarDescription from './Components/CarDescription';
import { VariabalesProvider } from './Components/Context';

function App() {
  
  const location = useLocation();

  return (
    <>
      <VariabalesProvider>
        <Navbar />
        <AnimatePresence>
              <Routes location={location}  key={location.pathname}>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/signout" element={<SignOut />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/cardescription" element={<CarDescription/>} />
                  <Route path="/addCar" element={<AddCar />} />
                  <Route path="/myCars" element={<MyCars />} />
                  <Route path="/myCars/EditCar" element={<EditCar />} />
                  <Route path="/products/cardescription/buyCar" element={<BuyCar />} />
              </Routes>
        </AnimatePresence>
      </VariabalesProvider>
    </>
  );
}
export default App;
