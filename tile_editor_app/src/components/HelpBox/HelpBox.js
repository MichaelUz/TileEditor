import React from 'react';
import classes from './HelpBox.module.css'
import Backdrop from '../Backdrop/Backdrop';

const HelpBox = (props) => {
    let text ='Hello ma name jeff';

    return(
        <div>
            <Backdrop clicked={props.clicked}/>
            <div className={classes.helpBox}>
                {text}
            </div>
        </div>
        
    )
}

export default HelpBox;