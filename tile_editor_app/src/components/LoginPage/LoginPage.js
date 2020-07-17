import React from 'react';

import LoginBox from './LoginBox/LoginBox';
import './LoginPage.module.css';

const loginPage = (props) => {
    return(
        <div>
            <text className = 'TitleText'>Tiles</text>
             <hr/>
            <LoginBox/>
        </div>
       
    );
};

export default loginPage;