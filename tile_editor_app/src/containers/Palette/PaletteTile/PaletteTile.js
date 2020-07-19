import React from 'react';

import classes from './PaletteTile.module.css';

const PaletteTile = (props) =>  {

    let myStyle = {};
    if(props.tile.color !== ''){
        myStyle = {
            width: '64px',
            height: '64px',
            backgroundColor: props.tile.color
        }
    }

    let classNames = [classes.tile, classes.selected];
    if (props.tile.selected) classNames = classNames.join(' ');
    else classNames = classNames[0];

    return (
        <div>
            {props.tile.color === '' ?
                <input className={classNames} type="image" src={props.tile.image} onClick={props.clicked}/> :
                <div style={myStyle} onClick={props.clicked}></div>
            } 
        </div>
        
    );
}

export default PaletteTile;