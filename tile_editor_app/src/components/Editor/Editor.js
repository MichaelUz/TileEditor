import React, { useEffect, useState } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Image, Rect} from 'react-konva';
import ScrollContainer from 'react-indiana-drag-scroll'
import useImage from 'use-image';

import Tile from '../../assets/images/grassCenter.png';
import ControllerPanel from '../../containers/ControllerPanel/ControllerPanel';
import classes from './Editor.module.css'

const Editor = (props) => {

    //let [Tile] = useImage('https://konvajs.org/assets/lion.png');
    let [mousePos, updateMousePos] = useState({
        mouseX: 0,
        mouseY: 0
    });

    useEffect(() => {
        document.body.className = 'noBg';
        return ( () =>{
            document.body.className = '';
        });
    });

    const width = window.innerWidth * 2;
    const height = window.innerHeight * 2;

    let maxX = Math.floor(width / 64);
    let maxY = Math.floor(height / 64);

    let grid = [];

    for(let i = 0; i < width; i += 64){
        grid.push(
            <Line
                key = { i }
                x = { i }
                y = { 0 }
                points = { [ 0, 0, 0, height ] }
                stroke = 'rgb(100, 100, 100)'
            />
        )
    }

    for(let i = 0; i < height; i += 64){
        grid.push(
            <Line
                key = { i + maxX }
                x = { 0 }
                y = { i }
                points = { [ 0, 0, width, 0 ] }
                stroke = 'rgb(100, 100, 100)'
            />
        )
    }
    let hoverRect = null;
    let mouseMoveHandler = (event) => {
        let stagePos = event.target.getStage().getPointerPosition();

        updateMousePos({
            mouseX: stagePos.x,
            mouseY: stagePos.y
        });
        hoverRect = <Rect
            x={Math.floor(mousePos.mouseX)}
            y={Math.floor(mousePos.mouseY)}
            stroke = 'rgba(3, 227, 99, 50)'
            width={64}
            height={64}
            strokeWidth={1}
            fill= 'rgb(3, 180, 50)'
        />
    }

    let clickHandler = (event) => {
        //draw an image at position
        alert();
    }
    
    let tile = new window.Image(64, 64);
    tile.src  = Tile;
    return(
        <div className={classes.container}>
            <ScrollContainer className = {classes.container} vertical = {true} horizontal hideScrollbars = {false}>
                <Stage onMouseUp={clickHandler} width={width} height={height} onMouseMove={mouseMoveHandler}>
                    <Layer>
                        {grid}
                        <Image image={tile}/>
                        <Rect
                            x={Math.floor(mousePos.mouseX / 64) * 64}
                            y={Math.floor(mousePos.mouseY / 64) * 64}
                            stroke = 'rgba(3, 227, 99, 50)'
                            width={64}
                            height={64}
                            strokeWidth={1}
                            fill= 'rgba(3, 180, 50, 0.1)'
                        />
                    </Layer>
                </Stage>
            </ScrollContainer>
            
            <div className = {classes.rightPanel}>
                <ControllerPanel />
            </div>
        </div>
      
    );
   
};

export default Editor;