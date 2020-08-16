import Tile from './Tile';

class GridTiles {
    constructor (rows, columns){
        this.csvData = new Array(rows);
        this.grid = new Array(rows);
        for(let i = 0; i < rows; i++){
            this.grid[i] = new Array(columns).fill(null);
            this.csvData[i] = new Array(columns).fill(0);
        }
    }


    addTile(tile, i, j){
        this.grid[i][j] = tile;
        this.csvData[i][j] = tile.id;
    }

    removeTile(i, j){
        this.grid[i][j] = null;
        this.csvData[i][j] = 0;
    }
}

export default GridTiles;