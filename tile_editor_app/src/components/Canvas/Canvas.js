import React from 'react';
import { Stage, Layer, Line, Image, Rect} from 'react-konva';
import ScrollContainer from 'react-indiana-drag-scroll';
import { connect } from 'react-redux';

import classes from '../../containers/Editor/Editor.module.css';
import GridCursor from './GridCursor/GridCursor';

const Canvas = (props) => {

    console.log('canvas rerendering');
    const width = 50 * 64;
    const height = 50 * 64;

    let maxX = Math.floor(width / 64);
    let grid = [];

    let mousePos = {
        x: 0,
        y: 0
    }
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

    let mouseMove = (event) => {
        let stagePos = event.target.getStage().getPointerPosition();
        console.log('updating mouse pos looool');
        mousePos = {
            x: Math.floor(stagePos.x / 64) * 64,
            y: Math.floor(stagePos.y / 64) * 64
        };
        console.log(mousePos);   
    }

    return(
        <ScrollContainer className = {classes.container} vertical = {props.canMove} horizontal={props.canMove} hideScrollbars = {false}>
            <Stage
                onMouseDown={props.clicked}
                onMouseUp={props.mouseUp}
                width={width} height={height} 
                onMouseMove={(event) => {
                    props.mouseMoveHandler(event);
                    mouseMove(event);
                }}
            >
                <Layer>
                    {grid}
                    {props.children}
                    <GridCursor/>
                    {props.selectRect}
                    {props.canMove ? null : 
                        <Rect
                            x={Math.floor(mousePos.x / 64) * 64}
                            y={Math.floor(mousePos.y / 64) * 64}
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
}

export default Canvas;