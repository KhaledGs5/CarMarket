import React, {useState} from "react";
import './Navbar.css';
import signupicon from './Images/Signup.png'
import signouticon from './Images/user.png'
import logo from './Images/Logo.png'
import menu from './Images/menu.png'
import { NavLink } from "react-router-dom";
import { useVariablesValue } from "./Context";



const  NavBar = () => {
    const {userName} = useVariablesValue("");
    const {userLastName} = useVariablesValue("");
    const {signSuccess} = useVariablesValue(false);
    const [SideBarToggle , setSideBarToggle] = useState(false);

    const ToggleSideBar = () => {
        setSideBarToggle(!SideBarToggle);
    }; 
    const HideSideBar = () => {
            setSideBarToggle(false);
    }
    window.addEventListener("resize", HideSideBar);
    return(
        <div className="BigContainer">
            <div className="NavbarContainer">
            <div className="LogoContainer">
                <img src={logo} alt="" />
            </div>
            <nav className="NavContainer">
                <NavLink to="/"
                className="btn btn_ltr"
                activeclassname="active">
                    Home
                </NavLink>
                <NavLink to="Products"
                className="btn btn_ltr"
                activeclassname="active">
                    Products
                </NavLink>
                <NavLink to="About"
                className="btn btn_ltr"
                activeclassname="active">
                    About
                </NavLink>
                <NavLink to="Contact"
                className="btn btn_ltr"
                activeclassname="active">
                    Contact Us
                </NavLink>
            </nav>
            <NavLink to="/SignUp"
                className="btn btn_ltr"
                id = {signSuccess ? "signupbtnHidden" : "signupbtn"}
                activeclassname="active">
                    <img id ="signupimg" src={signupicon} alt="" />
                    Sign Up
            </NavLink>
            <NavLink to="/SignIn"
                className="btn btn_ltr"
                id = {signSuccess ? "signinbtnHidden" : "signinbtn"}
                activeclassname="active">
                    Sign In
            </NavLink>
            <NavLink to="/SignOut"
                className="btn btn_ltr"
                id = {signSuccess ? "signoutbtn" : "signoutbtnHidden"}
                activeclassname="active">
                    <span id="userName">{userName + ' ' +  userLastName}</span>
                    <img id ="signoutimg" src={signouticon} alt="" />
            </NavLink>
            <button className="Toggle_SideBar_Btn" onClick={ToggleSideBar}>
                <img src={menu} alt="" />
            </button>
            </div>
            <div className={`SideBar ${SideBarToggle ? 'Opened' : ''}`}>
            <nav className="NavContainer">
                <NavLink to="/"
                className="btn btn_ltr"
                activeclassname="active">
                    Home
                </NavLink>
                <NavLink to="Products"
                className="btn btn_ltr"
                activeclassname="active">
                    Products
                </NavLink>
                <NavLink to="About"
                className="btn btn_ltr"
                activeclassname="active">
                    About
                </NavLink>
                <NavLink to="Contact"
                className="btn btn_ltr"
                activeclassname="active">
                    Contact Us
                </NavLink>
            </nav>
            <NavLink to="/SignUp"
                className="btn btn_ltr"
                id = {signSuccess ? "signupbtnHidden" : "signupbtn"}
                activeclassname="active">
                    <img id ="signupimg" src={signupicon} alt="" />
                    Sign Up
            </NavLink>
            <NavLink to="/SignIn"
                className="btn btn_ltr"
                id = {signSuccess ? "signinbtnHidden" : "signinbtn"}
                activeclassname="active">
                    Sign In
            </NavLink>
            <NavLink to="/SignOut"
                className="btn btn_ltr"
                id = {signSuccess ? "signoutbtn" : "signoutbtnHidden"}
                activeclassname="active">
                    <span id="userName">{userName + ' ' +  userLastName}</span>
                    <img id ="signoutimg" src={signouticon} alt="" />
            </NavLink>
            </div>
        </div>   
    );  
};

export default NavBar;