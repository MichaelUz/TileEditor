import React, { useEffect, useState, useCallback } from 'react';
import { Image, Rect } from 'react-konva';
import { connect } from 'react-redux';
import {v4 as uuidv4} from 'uuid';

import Canvas from '../../components/Canvas/Canvas';
import ControllerPanel from '../ControllerPanel/ControllerPanel';
import Palette from '../Palette/Palette';
import classes from './Editor.module.css';
import * as tools from '../ControllerPanel/tools';
import * as actions from '../../store/actions/editorActions';

const Editor = (props) => {
    
    console.log('editor re rendering');

    let [images, updateImages] = useState([]);
    let mousePos = {
        x: 0,
        y: 0
    }
    let [tileID, updateTileID] = useState(0);

    let initialSelectState = {
        selectCount: 0,
        firstClick:{
            x: 0,
            y: 0,
        },
        secondClick: {
            x: 0,
            y: 0
        },
        selectRect: null,
        selected: false
    }
    let [selectInfo, updateSelectInfo] = useState(initialSelectState);

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

        mousePos = {
            x: Math.floor(stagePos.x / 64) * 64,
            y: Math.floor(stagePos.y / 64) * 64
        };

        props.onUpdateMousePos(mousePos.x, mousePos.y);
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

    let drawImage = (x, y) => {
        
        let image = null;
        if(props.currentTile.image === null){
            image = (
                <Rect
                    transformsEnabled={'position'}
                    key={uuidv4()}
                    width={64}
                    height={64}
                    x={x}
                    y={y}
                    fill={props.currentTile.color}
                />
            )
        }
        else{
            let tile = new window.Image(64, 64);
            tile.src = props.currentTile.image;
            image = (
                <Image
                    key={uuidv4()} 
                    image={tile}
                    x = {x}
                    y = {y}
                />
            );
        } 
        return image;
    }

    let clickHandler = () => {
        if(props.currentTile === null && (props.currentTool === tools.STAMP || props.currentTool === tools.STAMP_MOVE)) return;

        let newImages = [...images];
        if(props.currentTool === tools.STAMP || props.currentTool === tools.STAMP_MOVE){
            
            if(!selectInfo.selected) {
                newImages.push(drawImage(mousePos.x, mousePos.y));
            }else{
                for(let i = selectInfo.firstClick.x; i < selectInfo.secondClick.x; i+= 64){
                    for(let j = selectInfo.firstClick.y; j < selectInfo.secondClick.y; j+= 64){
                        newImages.push(drawImage(i, j));
                    }
                }
                updateSelectInfo(initialSelectState);
            }

        }
        else if(props.currentTool === tools.ERASER || props.currentTool === tools.ERASER_MOVE){
            newImages = erase();
        }

        else if (props.currentTool === tools.SELECT){
            if(selectInfo.selected && (mousePos.x < selectInfo.secondClick.x && mousePos.x >= selectInfo.firstClick.x && mousePos.y < selectInfo.secondClick.y &&
                mousePos.y >= selectInfo.firstClick.y) && selectInfo.selectCount === 2){
                    updateSelectInfo(initialSelectState);
                    return;
            }
            selectInfo.selectCount = ++selectInfo.selectCount;

            if(selectInfo.selectCount === 1){
                selectInfo.firstClick.x = mousePos.x;
                selectInfo.firstClick.y = mousePos.y;

                selectInfo.selectRect = <Rect
                    x={selectInfo.firstClick.x}
                    y={selectInfo.firstClick.y}
                    stroke = 'rgba(3, 227, 99, 50)'
                    width={64}
                    height={64}
                    strokeWidth={1}
                    fill= 'rgba(3, 180, 50, 0.1)'
                />
            }
            else if(selectInfo.selectCount === 2){
                
                let temp = {...selectInfo.firstClick};
                selectInfo.firstClick.x = Math.min(selectInfo.firstClick.x, mousePos.x);
                selectInfo.firstClick.y = Math.min(selectInfo.firstClick.y, mousePos.y);

                selectInfo.secondClick.x = Math.max(temp.x, mousePos.x) + 64;
                selectInfo.secondClick.y = Math.max(temp.y, mousePos.y) + 64;

                selectInfo.selectRect = <Rect
                    x={selectInfo.firstClick.x}
                    y={selectInfo.firstClick.y}
                    stroke = 'rgba(3, 227, 99, 50)'
                    width={selectInfo.secondClick.x - selectInfo.firstClick.x}
                    height={selectInfo.secondClick.y - selectInfo.firstClick.y}
                    strokeWidth={1}
                    fill= 'rgba(3, 180, 50, 0.1)'
                />

                selectInfo.selected = true;
            }

            updateSelectInfo(selectInfo);
        }

        updateImages(newImages);
    }

    return(
            <div className={classes.container}>
                {/*<input directory="" webkitdirectory="" type="folder" />*/}
                <Canvas
                    clicked={clickHandler} 
                    mouseMoveHandler={mouseMoveHandler} 
                    mousePos={mousePos} 
                    canMove={props.currentTool === tools.MOVE}
                    selectRect={selectInfo.selectRect}
                        
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
        onAddGrid: (rows, columns) => dispatch(actions.addGrid(rows, columns)),
        onUpdateMousePos: (x, y) => dispatch(actions.updateMousePos(x, y))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);