import React from 'react';

import classes from './PaletteEditorTile.module.css';
import PaletteTile from '../../Palette/PaletteTile/PaletteTile';

const PaletteEditorTile = (props) => {
    return(
        <div className={classes.tile}>
            <PaletteTile tile={props.tile}/>
            <p className={classes.id}>ID: {props.tile.id}</p>
            <button className={classes.button} onClick={props.removeTile}>X</button>
        </div>
    );
}

export default PaletteEditorTile;