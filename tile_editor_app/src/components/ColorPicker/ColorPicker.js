import React from 'react';
import { ChromePicker } from 'react-color';


import classes from './ColorPicker.module.css';

const ColorPicker = (props) => {

    return (
        <div className={classes.container}>
            <ChromePicker color = {props.currentColor} onChange = {props.handleChange} />
            <button onClick={props.clicked}>Add to Palette</button>
        </div>
    );

}

export default ColorPicker;