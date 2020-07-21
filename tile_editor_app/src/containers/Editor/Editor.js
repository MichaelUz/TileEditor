import React, { useEffect, useState, useCallback } from 'react';
import { Image, Rect } from 'react-konva';
import { connect } from 'react-redux';

import Canvas from '../../components/Canvas/Canvas';
import ControllerPanel from '../ControllerPanel/ControllerPanel';
import Palette from '../Palette/Palette';
import classes from './Editor.module.css';
import * as tools from '../ControllerPanel/tools';
import * as actions from '../../store/actions/editorActions';

const Editor = (props) => {
    
    let [images, updateImages] = useState([]);
    let [mousePos, updateMousePos] = useState({
        x: 0,
        y: 0
    });
    let [tileID, updateTileID] = useState(0);

    useEffect(() =>{
        document.body.className = 'noBg';
        props.onAddGrid(50, 50);

        return() => {
            document.body.className = '';
        }
        
    }, [] );


    //update position of mouse in state
    let mouseMoveHandler = (event) => {

        let stagePos = event.target.getStage().getPointerPosition();
        if (props.currentTool === tools.STAMP_MOVE || props.currentTool === tools.ERASER_MOVE) clickHandler();

        updateMousePos({
            x: Math.floor(stagePos.x / 64) * 64,
            y: Math.floor(stagePos.y / 64) * 64
        });
    }

    let erase = () => {
        let newImages = [];
        images.forEach((image) => {
            if (!(image.props.x === mousePos.x && image.props.y === mousePos.y)){
                newImages.push(image);
            }
        });
        return newImages;
    }

    let clickHandler = () => {
        if(props.currentTile === null && (props.currentTool === tools.STAMP || props.currentTool === tools.STAMP_MOVE)) return;
        let newImages = [...images];


        if(props.currentTool === tools.STAMP || props.currentTool === tools.STAMP_MOVE){
            //Draw rect as tile
            newImages = erase();
            if(props.currentTile.image === null){
                console.log('drawing');
                newImages.push(
                    <Rect
                        key={tileID}
                        width={64}
                        height={64}
                        x={mousePos.x}
                        y={mousePos.y}
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
                        x = {mousePos.x}
                        y = {mousePos.y}
                    />
                );
            } 
            updateTileID(++tileID);
        }
        else if(props.currentTool === tools.ERASER || props.currentTool === tools.ERASER_MOVE){
            newImages = erase();
        }

        updateImages(newImages);
    }

    return(
            <div className={classes.container}>
                <Canvas
                    clicked={clickHandler} 
                    mouseMoveHandler={mouseMoveHandler} 
                    mousePos={mousePos} 
                    canMove={props.currentTool === tools.MOVE}
                        
                >
                    {images}
                </Canvas>
                <div className = {classes.rightPanel}>
                    <ControllerPanel/>
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
        onAddGrid: (rows, columns) => dispatch(actions.addGrid(rows, columns))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);