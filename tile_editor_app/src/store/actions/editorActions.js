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

export const addColorTile = (color) => {
    return{
        type: actionTypes.ADD_COLOR_TILE,
        color: color
    }
}

export const addGrid = (rows, columns) => {
    return {
        type: actionTypes.ADD_GRID,
        dimensions: {
            rows: rows,
            columns: columns
        }
    }
}