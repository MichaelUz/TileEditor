import React from 'react';
import { Stage, Layer, Line, Image, Rect} from 'react-konva';
import ScrollContainer from 'react-indiana-drag-scroll';
import { connect, ReactReduxContext, Provider } from 'react-redux';

import classes from '../../containers/Editor/Editor.module.css';
import GridCursor from './GridCursor/GridCursor';

const Canvas = (props) => {

    console.log('canvas rerendering');
    const width = 50 * 64;
    const height = 50 * 64;



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
            <ReactReduxContext.Consumer>
                {({store}) => (
                    <Stage
                        onMouseDown={props.clicked}
                        onMouseUp={props.mouseUp}
                        width={width} height={height} 
                        onMouseMove={(event) => {
                            props.mouseMoveHandler(event);
                        }}
                    >
                        <Provider store={store}>
                            <Layer>
                                {grid}
                                {props.children} 
                                {props.selectRect}
                                {props.canMove ? null : 
                                    <GridCursor/>
                                }
                            </Layer>
                        </Provider>
                    </Stage>
                )}
            </ReactReduxContext.Consumer>            
        </ScrollContainer>
    );
}

export default Canvas;