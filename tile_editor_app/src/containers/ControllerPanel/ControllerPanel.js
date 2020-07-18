import React, { Component } from 'react';
import { ChromePicker } from 'react-color';
import { connect } from 'react-redux';

import ControllerButton from '../../components/ControllerButton/ControllerButton';
import MoveCursor from '../../assets/images/moveCursor.png';
import StampIcon from '../../assets/images/stampIcon.png';
import SelectIcon from '../../assets/images/selectIcon.png';
import ColorPickerIcon from '../../assets/images/colorPickerIcon.png';
import ExportIcon from '../../assets/images/exportIcon.png';
import DownloadIcon from '../../assets/images/downloadIcon.png';
import classes from './ControllerPanel.module.css';
import * as actions from '../../store/actions/editorActions'; 
import * as tools from './tools';

class ControllerPanel extends Component {

    state = {
        currentColor : {
            r: 255,
            g: 255,
            b: 255,
            a: 1
        },
        selected: {
            [tools.MOVE]: true,
            [tools.STAMP]: false,
            [tools.SELECT]: false,
            [tools.COLOR_PICKER]: false
        }
    }

    handleChange = (color, event) => {
        this.setState({currentColor : color.rgb});
    }

    toolSelectedHandler = (tool) => {
        let newSelected = {
            [tools.MOVE]: false,
            [tools.STAMP]: false,
            [tools.SELECT]: false,
            [tools.COLOR_PICKER]: false
        }

        this.setState((prevState) => {
            newSelected[tool] = !prevState.selected[tool];
            return {
                ...prevState,
                selected: newSelected
            }
        }, () => {
            this.props.onToolChanged(newSelected[tool] === false ? tools.NONE : tool);
        });
    }

    render(){
        return(
            <div className = {classes.panel}>
                <ControllerButton selected = {this.state.selected[tools.MOVE]} selectable image = {MoveCursor} select = {() => this.toolSelectedHandler(tools.MOVE)}/>
                <ControllerButton selected = {this.state.selected[tools.STAMP]} selectable image = {StampIcon} select = {()=> this.toolSelectedHandler(tools.STAMP)}/>
                <ControllerButton selected = {this.state.selected[tools.SELECT]} selectable image = {SelectIcon} select = {()=> this.toolSelectedHandler(tools.SELECT)}/>
                <ControllerButton selected = {this.state.selected[tools.COLOR_PICKER]} selectable image = {ColorPickerIcon} select = {() => this.toolSelectedHandler(tools.COLOR_PICKER)}/>
                <ControllerButton selectable={false} image = {ExportIcon} select = {()=> null}/>
                <ControllerButton selectable={false} image = {DownloadIcon} select = {()=> null}/>
                <ChromePicker color = {this.state.currentColor} onChange = {this.handleChange} />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        currentTool: state.currentTool
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onToolChanged: (tool) => dispatch(actions.changeTool(tool))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ControllerPanel);