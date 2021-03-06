import React from 'react';
import {Link} from 'react-router-dom';
import classes from './LoginBox.module.css'

/*
   props : none
*/
const loginBox = (props) => {
    return (
        <div>
            <div className = {classes.loginBox}>
                <h2>Login</h2>
                <label className = {classes.label} htmlFor = 'username'>Email: </label>
                <input className = {classes.inputField} type = 'text' id = 'username'></input>
                <br/>
                <label className = {classes.label} htmlFor = 'password'>Password:  </label>
                <input className = {classes.inputField} type = 'password' id = 'password'></input>
                <Link to='/editor'>
                    <button className = {classes.nextButton}>Login</button>
                </Link>
            </div>
        </div>
    )
};

export default loginBox;