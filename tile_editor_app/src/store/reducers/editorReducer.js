import * as tools from '../../containers/ControllerPanel/tools';
import * as actionTypes from '../actions/actionsTypes';

import Tile from '../../classes/Tile';
import image from '../../assets/images/grassCenter.png';
import image2 from '../../assets/images/grassMid.png';

let startingTile = new Tile(0, image, '');
let startingTile2 = new Tile(1, image2, '');
let startingTile3 = new Tile(2, null, 'rgb(0, 180, 245)');



const initialState = {
    currentTool: tools.MOVE,
    currentTile: null,
    palette: [startingTile, startingTile2, startingTile3]
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
    

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.CHANGE_TOOL : return changeTool(state, action);
        case actionTypes.SELECT_TILE : return selectTile(state, action);

        default : return state;
    };
}

export default reducer;