import React, { useEffect } from 'react';

import classes from './Editor.module.css'

const Editor = (props) => {
    const canvasRef = React.useRef(null);

    useEffect(() => {
        document.body.className = 'noBg';
        return ( () =>{
            document.body.className = '';
        });
    });

    const click = () => {
        let ctx = canvasRef.current.getContext('2d');
        ctx.strokeText("Hello World", 10, 50);
    }
    return(
        <div className={classes.container}>
            <button onClick={click}>Clik me</button>
            <canvas
                ref = {canvasRef}
                width = {window.innerWidth}
                height = {window.innerHeight}>
            </canvas>
            <div className = {classes.rightPanel}>
            </div>
        </div>
      
    );
   
};

export default Editor;