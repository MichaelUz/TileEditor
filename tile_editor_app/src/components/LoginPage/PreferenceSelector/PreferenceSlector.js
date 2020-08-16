import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import classes from './PreferenceSelector.module.css';
import * as actions from '../../../store/actions/editorActions';

const PreferenceSelector = (props) => {

    const [dimensions, setDimensions] = useState({
        rows: 10,
        columns: 10
    })

    const inputChangeHandler = (event, type) => {
        setDimensions({
            ...dimensions,
            [type]: Math.max(parseInt(event.target.value, 10), 10)
        })
    }

    const onNextHandler = () => {
        props.onSetDimensions(dimensions);
    }

    return(
        <div className={classes.container}>
            <h2>Preferences</h2>
            <label className = {classes.label} htmlFor = 'rows'>Rows: </label>
            <input className = {classes.inputField} type = 'number' id = 'rows' min={10} onChange={(event) => inputChangeHandler (event, 'rows')}></input>
            <br/>
            <label className = {classes.label} htmlFor = 'columns'>Columns:  </label>
            <input className = {classes.inputField} type = 'number' id = 'columns' min={10} onChange={(event) => inputChangeHandler (event, 'columns')}></input>
            <Link to='/editor'>
                    <button className = {classes.nextButton} onClick={onNextHandler}>Start Tiling !</button>
            </Link>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDimensions: (dimensions) => dispatch(actions.setDimensions(dimensions))
    }
}

export default connect(null, mapDispatchToProps)(PreferenceSelector);