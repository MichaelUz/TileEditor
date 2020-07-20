import Tile from './Tile';

class GridTiles {
    constructor (rows, columns){
        this.grid = new Array(rows);
        for(let i = 0; i < rows; i++){
            this.grid[i] = new Array(columns).fill(null);
        }
    }

    addTile(tile, i, j){
        this.grid[i][j] = tile;
    }

    removeTile(i, j){
        this.grid[i][j] = null;
    }
}

export default GridTiles;