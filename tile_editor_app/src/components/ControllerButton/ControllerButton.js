import React, { useState } from 'react';

import classes from './ControllerButton.module.css';

/*
    Props: 
        - selectable : [bool] does the button stay selected
        - image :  [image] image to represent button
        - select : function that is called by container when this button is clicked
*/
const ControllerButton = (props) => {

    let [selected, toggleSelected] = useState(false);
    let classNames = [classes.controllerButton, classes.selected];
    classNames = selected ? classNames.join(' ') : classes.controllerButton;

    return(
        <input className = {props.selectable ? classNames : classes.controllerButton} 
            type = 'image' 
            src = { props.image } 
            onClick = { () => {
                props.select(selected);
                toggleSelected(!selected);
            }}/>
    );
    
};

export default ControllerButton;