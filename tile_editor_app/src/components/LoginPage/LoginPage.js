import React from 'react';

import LoginBox from './LoginBox/LoginBox';
import PreferenceSelector from './PreferenceSelector/PreferenceSlector';
import classes from './LoginPage.module.css';

const loginPage = (props) => {
    return(
        <div>
            <text className = 'TitleText'>Tiles</text>
             <hr/>
            <h3 style={{color:'white'}}>Here are some things to setup...</h3>
            <PreferenceSelector/>
            <a className={classes.createAcc} href='https://google.ca/'>Don't have an account ? Create an account.</a>
            <br/>
            <a className={classes.createAcc} href='https://google.ca/'>Continue without an account.</a>
        </div>
       
    );
};

export default loginPage;