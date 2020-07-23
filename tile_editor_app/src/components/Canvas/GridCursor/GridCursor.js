import React, { useEffect, useState } from 'react';
import { Rect } from 'react-konva';
import { connect } from 'react-redux';

const GridCursor = (props) => {
    
    let [mousePos, updateMousePos] = useState({
        x: 0, 
        y: 0
    });

    let onMouseUpdate = (e) => {
        updateMousePos({
            x: e.pageX - 32,
            y: e.pageY - 32
        });
        
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseUpdate, false);
        return () => {
            document.addEventListener('mouseenter', onMouseUpdate, false);
        }
    }, []);
    
    
    console.log('rendering grid cursor');

    let style = {
        position: 'fixed',
        left: mousePos.x % window.innerWidth,
        top: mousePos.y % window.innerHeight,
        border: 'solid 1px rgba(3, 227, 99, 1)',
        backgroundColor: 'rgba(3, 100, 50, 0.1)',
        width: 64,
        height: 64,
    }
    
    return (
        <Rect
            x={props.mousePos.x}
            y={props.mousePos.y}
            stroke = 'rgba(3, 227, 99, 50)'
            width={64}
            height={64}
            strokeWidth={1}
            fill= 'rgba(3, 180, 50, 0.1)'
        />
    );
}

const mapStateToProps = (state) => {
    return{
        mousePos: state.mousePos
    }
}

export default connect(mapStateToProps)(GridCursor);