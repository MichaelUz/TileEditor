import React from 'react';
import Radium from 'radium';

import classes from './PaletteTile.module.css';

const PaletteTile = (props) =>  {

    let styles = {};
    if(props.tile.color !== ''){
        styles = {
            base: {
                margin: 2,
                borderRadius: '0px',
                width: '64px',
                height: '64px',
                backgroundColor: props.tile.color,
                border: '2px solid transparent',
                outline: 0,
                ':hover': {
                    border: '2px solid rgb(3, 227, 99)'
                }
            },

            selected:{
                border: '2px solid rgb(3, 227, 99)'
            }
           
        }
    }

    let classNames = [classes.tile, classes.selected];
    if (props.tile.selected) classNames = classNames.join(' ');
    else classNames = classNames[0];
    return (
        <div>
            {props.tile.color === '' ?
                <input className={classNames} type="image" src={props.tile.image} onClick={props.clicked}/> :
                <button key={1} style={[styles.base, props.tile.selected && styles.selected]} onClick={props.clicked}/>
            } 
        </div>
        
    );
}

export default Radium(PaletteTile);