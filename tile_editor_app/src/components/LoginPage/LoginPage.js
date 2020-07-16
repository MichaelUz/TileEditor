import React from 'react';

import LoginBox from './LoginBox/LoginBox';

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