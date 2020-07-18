import React from 'react';
import { Stage, Layer, Line, Image, Rect} from 'react-konva';
import ScrollContainer from 'react-indiana-drag-scroll';

import classes from '../../containers/Editor/Editor.module.css';

const Canvas = (props) => {

    const width = window.innerWidth * 2;
    const height = window.innerHeight * 2;

    let maxX = Math.floor(width / 64);
    let grid = [];

    //Draw grid
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

    return(
        <ScrollContainer className = {classes.container} vertical = {props.canMove} horizontal={props.canMove} hideScrollbars = {false}>
            <Stage onMouseDown={props.clicked} width={width} height={height} onMouseMove={props.mouseMoveHandler}>
                <Layer>
                    {grid}
                    {props.children}
                    {props.canMove ? null : 
                        <Rect
                            x={Math.floor(props.mousePos.x / 64) * 64}
                            y={Math.floor(props.mousePos.y / 64) * 64}
                            stroke = 'rgba(3, 227, 99, 50)'
                            width={64}
                            height={64}
                            strokeWidth={1}
                            fill= 'rgba(3, 180, 50, 0.1)'
                        />
                    }
                </Layer>
            </Stage>
        </ScrollContainer>
    );
};

export default Canvas;