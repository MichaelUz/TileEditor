import React from 'react';

import classes from './Editor.module.css'

const editor = (props) => {
    return(
        <div>
            <h1>Welcome to the editor</h1>
            <div className = {classes.rightPanel}>
                <p>This is the right panel</p>
            </div>
        </div>
      
    );
   
};

export default editor;