import React from 'react';

const Button = (props) => {

    style ={
        borderRadius: 10,
        backgroundColor: props.bgColor,
        color: 'green',
        fontSize: 'large',
        padding: 5
    }
    return(
        <button>
            {props.children}
        </button>
    );
}

export default Button;