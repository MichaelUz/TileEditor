import React from 'react';

import classes from './PaletteEditorTile.module.css';
import PaletteTile from '../../Palette/PaletteTile/PaletteTile';

const PaletteEditorTile = (props) => {
    return(
        <div className={classes.tile}>
            <PaletteTile tile={props.tile}/>
            <input value={props.tile.id} className={classes.input} type='number'/>
            <button className={classes.button} onClick={props.removeTile}>X</button>
        </div>
    );
}

export default PaletteEditorTile;