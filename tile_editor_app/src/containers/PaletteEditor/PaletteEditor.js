import React from 'react';
import { connect } from 'react-redux';


import classes from './PaletteEditor.module.css';
import PaletteEditorTile from './PaletteEditorTile/PaletteEditorTile';
import TileUploader from '../../components/TileUploader/TileUploader';

const PaletteEditor = (props) => {

    let tiles = [];
    props.palette.forEach(tile => {
        tiles.push(<PaletteEditorTile tile={tile} key={tile.id}/>)
    });

    return(
        <div>
            <div className={classes.backdrop} onClick={props.clicked}></div>
            <div className={classes.paletteEditor}>
                <h2 className={classes.header}>Palette Editor</h2>
                <p>Edit the IDs that will be used in the CSV file, add and remove tiles !</p>
                <hr/>
                <div className={classes.tiles}>
                    {tiles}
                </div>
                <TileUploader/>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        palette: state.palette
    }
}

export default connect(mapStateToProps)(PaletteEditor);