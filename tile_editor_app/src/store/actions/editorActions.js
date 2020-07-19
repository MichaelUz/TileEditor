import * as actionTypes from './actionsTypes';

export const changeTool = (tool) => {
    return {
        type: actionTypes.CHANGE_TOOL,
        tool: tool
    }
}

export const selectTile = (id) => {
    return{
        type: actionTypes.SELECT_TILE,
        id: id
    }
}