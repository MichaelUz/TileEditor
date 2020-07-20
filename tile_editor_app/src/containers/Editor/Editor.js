import React, { useEffect, useState } from 'react';
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

    //Change background on editor page
    useEffect(() => {
        document.body.className = 'noBg';
        return ( () =>{
            document.body.className = '';
        });
    });

    useEffect(() =>{
        props.onAddGrid(50, 50);
    }, [] );


    //update position of mouse in state
    let mouseMoveHandler = (event) => {
        let stagePos = event.target.getStage().getPointerPosition();

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

    let clickHandler = (event) => {
        if(props.currentTile === null && props.currentTool === tools.STAMP) return;
        let newImages = [...images];

        switch(props.currentTool){
            case tools.STAMP:
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
                break;
            
            case tools.ERASER:
                newImages = erase();
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
        onAddGrid: (rows, columns) => dispatch(actions.addGrid(rows, columns))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);