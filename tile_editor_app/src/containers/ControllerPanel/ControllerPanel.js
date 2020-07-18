import React, { Component } from 'react';
import { ChromePicker } from 'react-color';

import ControllerButton from '../../components/ControllerButton/ControllerButton';
import MoveCursor from '../../assets/images/moveCursor.png';
import StampIcon from '../../assets/images/stampIcon.png';
import SelectIcon from '../../assets/images/selectIcon.png';
import ColorPickerIcon from '../../assets/images/colorPickerIcon.png';
import ExportIcon from '../../assets/images/exportIcon.png';
import DownloadIcon from '../../assets/images/downloadIcon.png';
import classes from './ControllerPanel.module.css';

class ControllerPanel extends Component {

    state = {
        currentColor : {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        }
    }

    handleChange = (color, event) => {
        this.setState({currentColor : color.rgb});
    }

    render(){
        return(
            <div className = {classes.panel}>
                <ControllerButton selectable image = {MoveCursor} select = {()=> null}/>
                <ControllerButton selectable image = {StampIcon} select = {()=> null}/>
                <ControllerButton selectable image = {SelectIcon} select = {()=> null}/>
                <ControllerButton selectable image = {ColorPickerIcon} select = {()=> null}/>
                <ControllerButton selectable image = {ExportIcon} select = {()=> null}/>
                <ControllerButton selectable image = {DownloadIcon} select = {()=> null}/>
                <ChromePicker color = {this.state.currentColor} onChange = {this.handleChange} />
            </div>
        );
    }
}

export default ControllerPanel;