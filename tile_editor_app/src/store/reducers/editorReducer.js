import * as tools from '../../containers/ControllerPanel/tools';

const initialState = {
    currentTool: tools.MOVE
}

const changeTool = (state, action) => {
    state = {currentTool: action.tool};
    return state;
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case 'CHANGE_TOOL' : return changeTool(state, action);

        default : return state;
    }
}

export default reducer;