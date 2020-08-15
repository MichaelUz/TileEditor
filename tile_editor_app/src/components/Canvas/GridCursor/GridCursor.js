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
            x: Math.floor(e.pageX /64) * 64,
            y: Math.floor(e.pageY / 64) * 64
        });
        
    }

    useEffect(() => {
        document.addEventListener('mousemove', onMouseUpdate, false);
        return () => {
            document.addEventListener('mouseenter', onMouseUpdate, false);
        }
    }, []);
    
    
    console.log(props.mousePos);

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
            x={mousePos.x}
            y={mousePos.y}
            stroke = 'rgba(3, 227, 99, 50)'
            width={64}
            height={64}
            strokeWidth={1}
            fill= 'rgba(3, 180, 50, 0.1)'
        />
    );
}


export default GridCursor;