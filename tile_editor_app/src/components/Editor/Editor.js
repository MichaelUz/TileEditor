import React, { useEffect } from 'react';
import Konva from 'konva';
import { Stage, Layer, Line, Circle} from 'react-konva';
import ScrollContainer from 'react-indiana-drag-scroll'


import classes from './Editor.module.css'
import MoveCursor from '../../assets/images/moveCursor.png';

const Editor = (props) => {

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

    console.log(maxX, maxY);
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

    console.log(grid.length);
    

    return(
        <div className={classes.container}>
            <ScrollContainer className = {classes.container} vertical = {true} horizontal hideScrollbars = {false}>
                <Stage width={width} height={height}>
                    <Layer>
                        {grid}
                    </Layer>
                </Stage>
            </ScrollContainer>
            
            <div className = {classes.rightPanel}>
                <div className = {classes.rpButtons}>
                    <input className = {classes.rpButton} type = 'image' src = { MoveCursor } />
                </div>
            </div>
        </div>
      
    );
   
};

export default Editor;