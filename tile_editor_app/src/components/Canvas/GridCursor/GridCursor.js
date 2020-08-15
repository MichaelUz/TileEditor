import React, { useEffect, useState } from 'react';
import { Rect } from 'react-konva';
import { connect } from 'react-redux';

const GridCursor = (props) => {
        
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
    return {
        mousePos: state.mousePos
    }
}


export default connect(mapStateToProps)(GridCursor);