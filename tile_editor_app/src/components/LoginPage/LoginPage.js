import React from 'react';

import LoginBox from './LoginBox/LoginBox';
import classes from './LoginPage.module.css';

const loginPage = (props) => {
    return(
        <div>
            <text className = 'TitleText'>Tiles</text>
             <hr/>
            <LoginBox/>
            <a className={classes.createAcc} href='https://google.ca/'>Don't have an account ? Create an account.</a>
            <br/>
            <a className={classes.createAcc} href='https://google.ca/'>Continue without an account.</a>
        </div>
       
    );
};

export default loginPage;