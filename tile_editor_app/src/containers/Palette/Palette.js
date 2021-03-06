import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/editorActions';
import PaletteTile from './PaletteTile/PaletteTile';
import classes from './Palette.module.css';
import Button from '../../components/Button/Button';


class Palette extends Component {

    render() {
        let tiles = [];
        this.props.myPalette.forEach(tile => {
            tiles.push(
                <PaletteTile key={tile.id} tile={tile} clicked={() => this.props.onSelectTile(tile.id)}/>
            )
        });

        return (
            <div className={classes.container}>
                {!this.props.hideTitle ? <h3>Palette</h3> : null}
                <div className={classes.Palette}>
                    {tiles}
                </div>
            </div>
           
        );
    }
}

const mapStateToProps = state => {
    return {
        myPalette: state.palette,
        currentTile: state.currentTile
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSelectTile: (id) => dispatch(actions.selectTile(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);