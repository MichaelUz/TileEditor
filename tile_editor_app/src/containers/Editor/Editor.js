import React, { useEffect, useState } from 'react';
import { Image } from 'react-konva';

import Canvas from '../../components/Canvas/Canvas';
import ControllerPanel from '../ControllerPanel/ControllerPanel';
import classes from './Editor.module.css';
import Tile from '../../assets/images/grassCenter.png'

const Editor = (props) => {
    
    let [images, updateImages] = useState([]);
    let [mousePos, updateMousePos] = useState({
        x: 0,
        y: 0
    });

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
        //draw an image at position
        let tile = new window.Image(64, 64);
        tile.src = Tile;
        let newImages = [...images];
        newImages.push(
            <Image
                key={mousePos.mouseX + mousePos.mouseY} 
                image={tile}
                x = {Math.floor(mousePos.x / 64 ) * 64}
                y = {Math.floor(mousePos.y / 64 ) * 64}
            />
        );
        updateImages(newImages);
    }

    return(
            <div className={classes.container}>
                <Canvas clicked={clickHandler} mouseMoveHandler={mouseMoveHandler} mousePos={mousePos}>
                    {images}
                </Canvas>
                <div className = {classes.rightPanel}>
                    <ControllerPanel />
                </div>     
            </div>
             
    );
   
};

export default Editor;