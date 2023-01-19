// import { useRef, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import axios from '../api/axios';
import "./auth.css";
const LOGOUT_URL = '/users/logout';
// import Cookies from "js-cookie";
const Logout = () => {
    // axios.get("http://localhost:5000" + LOGOUT_URL)
    //     .then(response => console.log(response))
    //     .catch(error => {
    //         console.error('There was an error!', error);
    //     });
    Cookies.set("authtoken", "false")
    return (
        <a href='/'>Go to Home Page</a>
    )
}

export default Logout