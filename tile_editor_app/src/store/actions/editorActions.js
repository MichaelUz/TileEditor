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

export const addGrid = () => {
    return {
        type: actionTypes.ADD_GRID,
    }
}

export const updateMousePos = (x, y) => {
    return{
        type: actionTypes.UPDATE_MOUSE_POS,
        mousePos: {
            x: x,
            y: y
        }
    }
}

export const setDimensions = (dimensions) => {
    return {
        type: actionTypes.SET_DIMENSIONS,
        dimensions: dimensions
    }
}

export const addImageTile = (image) => {
    return{
        type: actionTypes.ADD_IMAGE_TILE,
        image: image
    }
}

export const addTileGrid = (x, y) => {
    return{
        type: actionTypes.ADD_TILE_GRID,
        position: {
            x: x,
            y: y
        }
    }
}


export const removeTileGrid = (clear, x, y) => {
    return {
        type: actionTypes.REMOVE_TILE_GRID,
        position: {
            x: x, 
            y: y
        },
        clear: clear
    }
}

export const removePaletteTile = (id) => {
    return {
        type: actionTypes.REMOVE_PALETTE_TILE,
        id: id
    }
}