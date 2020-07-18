const initialState = {
    currentTool: ''
}

const changeTool = (state, action) => {
    console.log(state.currentTool, action.tool);
    state = {currentTool: action.tool};
    return state;
}

const reducer = (state = initialState, action) => {
    console.log('received');
    switch(action.type){
        case 'CHANGE_TOOL' : return changeTool(state, action);

        default : return state;
    }
}

export default reducer;