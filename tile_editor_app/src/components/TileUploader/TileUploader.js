import React from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/editorActions';
import ImageUploader from 'react-images-upload';

const TileUploader = (props) => {

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
        <ImageUploader
            withIcon={true}
            buttonText='Choose images'
            onChange={onDrop}
            imgExtension={['.jpg', '.png']}
            maxFileSize={5242880}
            fileContainerStyle={style}
            label={'Max individual file size : 5mb'}
        />
    )
}

const mapDispatchToProps = (dispatch) => {
    return{
        onAddImageTile: (image) => dispatch(actions.addImageTile(image))
    }
}

export default connect(null, mapDispatchToProps)(TileUploader);