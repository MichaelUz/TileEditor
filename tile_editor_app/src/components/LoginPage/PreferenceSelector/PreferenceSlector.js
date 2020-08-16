import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import ImageUploader from 'react-images-upload';

import classes from './PreferenceSelector.module.css';
import * as actions from '../../../store/actions/editorActions';
import Palette from '../../../containers/Palette/Palette';

const PreferenceSelector = (props) => {

    const [dimensions, setDimensions] = useState({
        rows: 10,
        columns: 10,
        cellSize: 64
    });

    const dimensionsChangedHandler = (event, type) => {
        setDimensions({
            ...dimensions,
            [type]: Math.max(parseInt(event.target.value, 10), 1)
        })
    }

    const cellSizeChangedHandler = (event) => {
        setDimensions({
            ...dimensions,
            cellSize: Math.max(parseInt(event.target.value, 10), 8)
        });
    }

    const onNextHandler = () => {
        props.onSetDimensions(dimensions);
    }

    const onDrop = (picture) => {
        if(picture.forEach){
            picture.forEach((pic) => {
                props.onAddImageTile(URL.createObjectURL(pic));
                console.log('added', pic);
            });
        }
    }

    const style = {
        backgroundColor: 'rgb(20, 20, 20)',
        color: 'white',
        width: '70%'
    }

    return(
        <div className={classes.container}>
            <h2>Dimensions</h2>
            <label className = {classes.label} htmlFor = 'rows'>Rows: </label>
            <input className = {classes.inputField} type = 'number' id = 'rows' onChange={(event) => dimensionsChangedHandler (event, 'rows')}></input>
            <br/>
            <label className = {classes.label} htmlFor = 'columns'>Columns:  </label>
            <input className = {classes.inputField} type = 'number' id = 'columns' onChange={(event) => dimensionsChangedHandler (event, 'columns')}></input>
            <br/>
            <label className = {classes.label}>CellSize:</label>
            <input className = {classes.inputField} type = 'number' id = 'cellSizeWidth' onChange={(event) => cellSizeChangedHandler (event, 'columns')}></input>
            <hr className = {classes.prefHr}/>
            <h2>Palette</h2>

            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={onDrop}
                imgExtension={['.jpg', '.png']}
                maxFileSize={5242880}
                fileContainerStyle={style}
                label={'Max individual file size : 5mb'}
            />

            <Palette hideTitle/>

            <Link to='/editor'>
                    <button className = {classes.nextButton} onClick={onNextHandler}>Start Tiling !</button>
            </Link>

        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSetDimensions: (dimensions) => dispatch(actions.setDimensions(dimensions)),
        onAddImageTile: (image) => dispatch(actions.addImageTile(image))
    }
}

export default connect(null, mapDispatchToProps)(PreferenceSelector);