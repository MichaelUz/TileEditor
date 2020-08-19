import React from 'react';

import classes from './HelpBoxItem.module.css'

const HelpBoxItem = (props) => {

    return(
        <div className={classes.container}>
            <img className={classes.image} src={props.info.image}/>
            <p className={classes.text}>{props.info.text}</p>
        </div>
    );
}

export default HelpBoxItem;