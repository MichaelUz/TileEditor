import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';
import { connect } from 'react-redux';

import Canvas from '../../components/Canvas/Canvas';
import ControllerPanel from '../ControllerPanel/ControllerPanel';
import Palette from '../Palette/Palette';
import classes from './Editor.module.css';
import Tile from '../../assets/images/grassCenter.png';
import * as tools from '../ControllerPanel/tools';

const Editor = (props) => {
    
    let [images, updateImages] = useState([]);
    let [mousePos, updateMousePos] = useState({
        x: 0,
        y: 0
    });
    let [tileID, updateTileID] = useState(0);

    //Change background on editor page
    useEffect(() => {
        document.body.className = 'noBg';
        return ( () =>{
            document.body.className = '';
        });
    });


    let mouseMoveHandler = (event) => {
        let stagePos = event.target.getStage().getPointerPosition();

        updateMousePos({
            x: stagePos.x,
            y: stagePos.y
        });
    }

    let clickHandler = (event) => {
        if(props.currentTool !== tools.STAMP || props.currentTile === null) return;
        let tile = new window.Image(64, 64);
        tile.src = props.currentTile.image;
        let newImages = [...images];
        newImages.push(
            <Image
                key={tileID} 
                image={tile}
                x = {Math.floor(mousePos.x / 64 ) * 64}
                y = {Math.floor(mousePos.y / 64 ) * 64}
            />
        );
        updateTileID(++tileID);
        updateImages(newImages);
    }

    return(
            <div className={classes.container}>
                <Canvas clicked={clickHandler} mouseMoveHandler={mouseMoveHandler} mousePos={mousePos} canMove={props.currentTool === tools.MOVE }>
                    {images}
                </Canvas>
                <div className = {classes.rightPanel}>
                    <ControllerPanel />
                    <Palette/>
                </div>     
            </div>
             
    );
   
};

const mapStateToProps = (state) => {
    return {
        currentTool: state.currentTool,
        currentTile: state.currentTile
    }
};

const mapDispatchToProps =  (dispatch) => {
    return {

    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);