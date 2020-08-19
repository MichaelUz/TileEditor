import React from 'react';

import classes from './HelpBox.module.css'
import Backdrop from '../Backdrop/Backdrop';
import HelpBoxItem from './HelpBoxItem/HelpBoxItem';
import Icons from '../../assets/images/toolIcons/index';
import * as tools from '../../containers/ControllerPanel/tools';

const HelpBox = (props) => {

    let info = {
        image: Icons.MoveCursor,
        text: 'This is the move cursor'
    }

    let allData = {
        [tools.MOVE]: {
            image: Icons.MoveCursor,
            text: 'This is the Move Cursor. Use this to navigate the canvas by clicking and dragging.'
        },
        ['DOWNLOAD']: {
            image: Icons.DownloadIcon,
            text: 'This is the Download Button. Use this to download canvas in CSV format.'
        },
        [tools.STAMP]: {
            image: Icons.StampIcon,
            text: 'This is the Stamp Tool. Use this to place a selected tile on the canvas by left clicking.'
        },
        [tools.STAMP_MOVE]: {
            image: Icons.StampMoveIcon,
            text: 'This is the Stamp Move Tool. Toggle this tool by pressing the "W" or "P" keys whenever the Stamp Tool is already selected.\
            When this tool is active, tiles can be placed by just moving the mouse over where the tiles are meant to be drawn.'
        },
        [tools.SELECT]:{
            image: Icons.SelectIcon,
            text: 'This is the Select Tool. When this tool is active, create a selection area by clicking the two corners of the soon to be selection.\
            Once a selection area has been created, you can use the Stamp tool to fill that area with the selected tile in the palette.'
        },
        [tools.COLOR_PICKER]:{
            image: Icons.ColorPickerIcon,
            text: 'This is the Color Picker. Use this tool to select a color to be added to your palette as a usable tile.'
        },
        [tools.ERASER]:{
            image: Icons.EraserIcon,
            text: 'This is the Eraser Tool. Use this tool to remove a tile form the Canvas by left clicking.'
        },
        [tools.ERASER_MOVE]:{
            image: Icons.EraserMoveIcon,
            text: 'This is the Eraser Move Tool. Toggle this tool by pressing the "W" or "P" keys whenever the Eraser Tool is already selected.\
            When this tool is active, tiles can be removed by just moving the mouse over the tiles you want to be removed.'
        },
        [tools.CLEAR]: {
            image: Icons.ClearIcon,
            text: 'This is the Clear Tool. Use this to clear the entire canvas.'
        }       
    }

    let items = Object.values(allData).map((info, index) =>{
        return <HelpBoxItem key={index} info={info}/>
    });

    return(
        <div>
            <Backdrop clicked={props.clicked}/>
            <div className={classes.helpBox}>
                <h2>Help</h2>
                <div className={classes.items}>
                    {items}
                </div>
            </div>
        </div>
        
    )
}

export default HelpBox;