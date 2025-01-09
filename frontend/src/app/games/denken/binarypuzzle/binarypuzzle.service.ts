import { Injectable } from "@angular/core";
import { GameService } from "../../game.service";

export enum Status {
  SET = 0,
  FREE = 1
}

@Injectable({
  providedIn: 'root'
})
export class BinaryPuzzleService {

  difficulty: string = "easy";
  size: number = 8;
  win: boolean = false;

  name: string = "BinaryPuzzle";

  field: number[][] = [];
  statusField: number[][] = [];

  constructor(private gameService: GameService) {
    this.field = Array.from({ length: this.size }, () => Array(this.size).fill(-1));
    this.statusField = Array.from({ length: this.size }, () => Array(this.size).fill(Status.FREE));

    let cellE = 69/8;
    document.documentElement.style.setProperty('--cell-size', `${cellE}vh`);
    this.createPuzzle();
  }

  getArray(): number[] {
    return Array.from({ length: this.size }, (_, i) => i);
  }


  async reset() {
    this.createNewPuzzle(this.size);

    await this.gameService.updateStat(this.name, this.difficulty, this.win);

    this.win = false;
  }

  async createPuzzle() {
    if (this.gameService.isLoggedIn()) {
        await this.gameService.load(this.name, this.difficulty);

        if (!this.gameService.getStat()?.data) {
            this.gameService.createStat(this.name, this.difficulty);
        }

        if (!this.gameService.getSave()?.data) {
            this.createNewPuzzle(this.size);
        } else {
            this.field = this.gameService.getBoard();
            this.statusField = this.gameService.getStatus();
        }
    } else {
        this.createNewPuzzle(this.size);
    }
    this.check();
}

createNewPuzzle(size: number) {
    try {
        this.statusField = Array.from({ length: this.size }, () => Array(this.size).fill(Status.FREE));

        if (size % 2 !== 0) {
            throw new Error("Size must be an even number.");
        }

        const puzzle: number[][] = Array.from({ length: size }, () => Array(size).fill(-1));

        if (!this.fillGrid(puzzle, size, 0, 0)) {
            throw new Error("Failed to generate a valid binary puzzle.");
        }

        this.modifyArray(puzzle);
        
        this.field = puzzle;
    } catch (error) {
        this.field = Array.from({ length: this.size }, () => Array(this.size).fill(-1));
        this.statusField = Array.from({ length: this.size }, () => Array(this.size).fill(Status.FREE));
    }
}

  async save() {
    if (!this.gameService.isLoggedIn()) {
      return;
    }
    await this.gameService.load(this.name, this.difficulty);
    await this.gameService.loadUsername();
    if (this.gameService.getUsername() === '') return;

    const saveJSON = {
      data: {
        board: this.gameService.convertArrayToJson(this.field),
        status: this.gameService.convertArrayToJson(this.statusField)
      }
    };

    if (this.gameService.getSave()?.data) {
      this.gameService.updateSave(await this.gameService.getStat()?.data.id, saveJSON);
    } else {
      this.gameService.createSave(await this.gameService.getStat()?.data.id, saveJSON);
    }
  }

  async select(event: Event) {
    try {
        await this.save();
    } catch (error) { }

    const element = event.target as HTMLSelectElement;
    element.blur();
    this.difficulty = element.value;

    switch (this.difficulty) {
        case "easy":
            this.size = 8;
            break;
        case "medium":
            this.size = 10;
            break;
        case "hard":
            this.size = 12;
            break;
    }

    const cellSize = 69 / this.size;
    document.documentElement.style.setProperty('--cell-size', `${cellSize}vh`);

    await this.createPuzzle();
}

  click(x: number, y: number) {
    if (this.statusField[x][y] === Status.SET || this.win) { return; }
    this.field[x][y] = (this.field[x][y] + 1) % 3;
    this.check();
  }

  check() {
    if (this.isValidPuzzle(this.field, this.size)) {
      this.win = true;
    } else {
      this.win = false;
    }
  }

  isValidPuzzle(puzzle: number[][], size: number): boolean {
    for (let row = 0; row < size; row++) {
      for (let col = 0; col < size - 2; col++) {
        if (
          puzzle[row][col] === puzzle[row][col + 1] &&
          puzzle[row][col] === puzzle[row][col + 2]
        ) {
          return false;
        }
      }

      let rowZeros = 0, rowOnes = 0;
      for (let col = 0; col < size; col++) {
        if (puzzle[row][col] === 0) rowZeros++;
        if (puzzle[row][col] === 1) rowOnes++;
      }
      if (rowZeros !== size / 2 || rowOnes !== size / 2) {
        return false;
      }
    }

    for (let col = 0; col < size; col++) {
      for (let row = 0; row < size - 2; row++) {
        if (
          puzzle[row][col] === puzzle[row + 1][col] &&
          puzzle[row][col] === puzzle[row + 2][col]
        ) {
          return false;
        }
      }

      let colZeros = 0, colOnes = 0;
      for (let row = 0; row < size; row++) {
        if (puzzle[row][col] === 0) colZeros++;
        if (puzzle[row][col] === 1) colOnes++;
      }
      if (colZeros !== size / 2 || colOnes !== size / 2) {
        return false;
      }
    }

    for (let row1 = 0; row1 < size - 1; row1++) {
      for (let row2 = row1 + 1; row2 < size; row2++) {
        if (puzzle[row1].every((val, index) => val === puzzle[row2][index])) {
          return false;
        }
      }
    }

    for (let col1 = 0; col1 < size - 1; col1++) {
      for (let col2 = col1 + 1; col2 < size; col2++) {
        let identical = true;
        for (let row = 0; row < size; row++) {
          if (puzzle[row][col1] !== puzzle[row][col2]) {
            identical = false;
            break;
          }
        }
        if (identical) {
          return false;
        }
      }
    }

    return true;
  }

  modifyArray(arr: number[][]) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (Math.random() < 0.6) {
          arr[i][j] = -1;
        } else {
          this.statusField[i][j] = Status.SET;
        }
      }
    }
  }

  fillGrid(puzzle: number[][], size: number, row: number, col: number): boolean {
    if (row === size) {
      return true;
    }

    const nextRow = col === size - 1 ? row + 1 : row;
    const nextCol = col === size - 1 ? 0 : col + 1;

    const values = [0, 1];
    values.sort(() => Math.random() - 0.5);

    for (const value of values) {
      if (this.isValid(puzzle, size, row, col, value)) {
        puzzle[row][col] = value;
        if (this.fillGrid(puzzle, size, nextRow, nextCol)) {
          return true;
        }
        puzzle[row][col] = -1;
      }
    }

    return false;
  }

  isValid(puzzle: number[][], size: number, row: number, col: number, value: number): boolean {
    if (col >= 2 && puzzle[row][col - 1] === value && puzzle[row][col - 2] === value) {
      return false;
    }

    if (row >= 2 && puzzle[row - 1][col] === value && puzzle[row - 2][col] === value) {
      return false;
    }

    const rowCount = this.countInRow(puzzle[row], value) + 1;
    if (rowCount > size / 2) return false;

    const colCount = this.countInColumn(puzzle, col, value) + 1;
    if (colCount > size / 2) return false;

    if (col === size - 1) {
      const currentRow = [...puzzle[row]];
      currentRow[col] = value;
      for (let i = 0; i < row; i++) {
        if (JSON.stringify(puzzle[i]) === JSON.stringify(currentRow)) {
          return false;
        }
      }
    }

    if (row === size - 1) {
      const currentCol = Array.from({ length: size }, (_, i) => (i === row ? value : puzzle[i][col]));
      for (let j = 0; j < col; j++) {
        const otherCol = puzzle.map(r => r[j]);
        if (JSON.stringify(currentCol) === JSON.stringify(otherCol)) {
          return false;
        }
      }
    }

    return true;
  }

  countInRow(row: number[], value: number): number {
    return row.filter(cell => cell === value).length;
  }

  countInColumn(puzzle: number[][], col: number, value: number): number {
    return puzzle.filter(row => row[col] === value).length;
  }

  shuffle(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

}