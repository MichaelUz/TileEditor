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
        selectRect: null
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
        if(props.currentTool !== tools.SELECT) {
            updateSelectInfo(initialSelectState);
        }
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

        else if (props.currentTool === tools.SELECT){
            selectInfo.selectCount = selectInfo.selectCount < 2 ? selectInfo.selectCount + 1 : 0;
            
            if(selectInfo.selectCount === 0){
                selectInfo.selectRect = null;
            }

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

                console.log('TEMP : ' , temp);
                console.log('MOUSE POS : ', mousePos);
                selectInfo.secondClick.x = Math.max(temp.x, mousePos.x);
                selectInfo.secondClick.y = Math.max(temp.y, mousePos.y);

                console.log(selectInfo);
                
                selectInfo.selectRect = <Rect
                    x={selectInfo.firstClick.x}
                    y={selectInfo.firstClick.y}
                    stroke = 'rgba(3, 227, 99, 50)'
                    width={selectInfo.secondClick.x - selectInfo.firstClick.x + 64}
                    height={selectInfo.secondClick.y - selectInfo.firstClick.y + 64}
                    strokeWidth={1}
                    fill= 'rgba(3, 180, 50, 0.1)'
                />
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
        onAddGrid: (rows, columns) => dispatch(actions.addGrid(rows, columns))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);