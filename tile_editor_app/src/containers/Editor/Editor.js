import React, { useEffect, useState } from 'react';
import { Image, Rect } from 'react-konva';
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


    //update position of mouse in state
    let mouseMoveHandler = (event) => {
        let stagePos = event.target.getStage().getPointerPosition();

        updateMousePos({
            x: stagePos.x,
            y: stagePos.y
        });
    }

    let clickHandler = (event) => {
        if(props.currentTile === null && props.currentTool === tools.STAMP) return;
        let newImages = [...images];

        switch(props.currentTool){
            case tools.STAMP:
                //Draw rect as tile
                if(props.currentTile.image === null){
                    console.log('drawing');
                    newImages.push(
                        <Rect
                            key={tileID}
                            width={64}
                            height={64}
                            x={Math.floor(mousePos.x / 64 ) * 64}
                            y={Math.floor(mousePos.y / 64 ) * 64}
                            fill={props.currentTile.color}
                        />
                    )
                }
                //Draw image tile
                else{
                    let tile = new window.Image(64, 64);
                    tile.src = props.currentTile.image;
                    newImages.push(
                        <Image
                            key={tileID} 
                            image={tile}
                            x = {Math.floor(mousePos.x / 64 ) * 64}
                            y = {Math.floor(mousePos.y / 64 ) * 64}
                        />
                    );
                } 
                updateTileID(++tileID);
                break;
            
            case tools.ERASER:
                break;
        }

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