import React from 'react';

import LoginBox from './LoginBox/LoginBox';
import PreferenceSelector from './PreferenceSelector/PreferenceSlector';
import classes from './LoginPage.module.css';

const loginPage = (props) => {
    return(
        <div>
            <h1 className = {classes.TitleText}>Tiles</h1>
             <hr/>
            <h3 style={{color:'white'}}>Here are some things to setup...</h3>
            <PreferenceSelector/>
        </div>
       
    );
};

export default loginPage;