import React, { useState } from 'react';

import classes from './ControllerButton.module.css';

/*
    Props: 
        - selectable : [bool] does the button stay selected
        - image :  [image] image to represent button
        - select : function that is called by container when this button is clicked
*/
const ControllerButton = (props) => {

    let classNames = [classes.controllerButton, classes.selected];
    classNames = props.selected ? classNames.join(' ') : classes.controllerButton;

    return(
        <input className = {props.selectable ? classNames : classes.controllerButton} 
            type = 'image' 
            src = { props.image } 
            onClick = {props.select}/>
    );
    
};

export default ControllerButton;