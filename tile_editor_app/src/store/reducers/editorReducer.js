import * as tools from '../../containers/ControllerPanel/tools';
import * as actionTypes from '../actions/actionsTypes';

import GridTiles from '../../classes/GridTiles';
import Tile from '../../classes/Tile';
import image from '../../assets/images/grassCenter.png';
import image2 from '../../assets/images/grassMid.png';

let startingTile = new Tile(0, image, '');
let startingTile2 = new Tile(1, image2, '');
let startingTile3 = new Tile(2, null, 'rgb(0, 180, 245)');


const initialState = {
    dimensions: {
        rows: 10, 
        columns: 10,
        cellSize: 64
    },
    currentTool: tools.MOVE,
    currentTile: null,
    palette: [startingTile, startingTile2, startingTile3],
    tileID: 3,
    gridTiles: null,
    mousePos: {
        x: 0,
        y: 0
    }
}

const setDimensions = (state, action) => {
    state = {
        ...state,
        dimensions: {...action.dimensions}
    }
    console.log('new dimensions', state.dimensions);
    return state;
}

const changeTool = (state, action) => {
    state = {
        ...state,
        currentTool: action.tool
    };
    return state;
}

const selectTile = (state, action) => {
    let id = action.id;
    let palette = [...state.palette];
    let newCurrentTile = null;

    for(let i = 0; i < palette.length; i++){
        if(palette[i].id === id){
            palette[i].selected = !palette[i].selected;
            newCurrentTile = palette[i].selected ? palette[i] : null;
        }
        else{
            palette[i].selected = false;
        }
    }

    state = {
        ...state,
        palette: palette,
        currentTile: newCurrentTile
    };
    return state;
}

const addGrid = (state, action) => {
    state = {
        ...state,
        gridTiles: new GridTiles(action.dimensions.rows, action.dimensions.columns)
    }
    return state;
}

const addColorTile = (state, action) => {

    let newPalette = [...state.palette];
    newPalette.push(new Tile(state.tileID, null, action.color));
    state = {
        ...state,
        palette: newPalette,
        tileID: ++state.tileID
    }

    return state;
}

const updateMousePos = (state, action) => {
    state = {
        ... state,
        mousePos: {
            x: action.mousePos.x,
            y: action.mousePos.y
        }
    }

    return state;
}
    

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_TOOL : return changeTool(state, action);
        case actionTypes.SELECT_TILE : return selectTile(state, action);
        case actionTypes.ADD_COLOR_TILE: return addColorTile(state, action);
        case actionTypes.ADD_GRID: return addGrid(state, action);
        case actionTypes.UPDATE_MOUSE_POS: return updateMousePos(state, action);
        case actionTypes.SET_DIMENSIONS: return setDimensions(state, action);

        default : return state;
    };
}

export default reducer;