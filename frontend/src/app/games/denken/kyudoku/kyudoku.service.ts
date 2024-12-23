import { Injectable } from '@angular/core';

export enum Status {
  CLEAR = 0,
  ERASED = 1,
  MARKED = 2
}

@Injectable({
  providedIn: 'root'
})
export class KyudokuService {

  selectValue: string = "easy";
  difficulty: string = "easy";

  field: number[][] = Array.from({ length: 6 }, () => Array(6).fill(0));
  statusField: Status[][] = Array.from({ length: 6}, () => Array(6).fill(Status.CLEAR));

  pointX: number | undefined;
  pointY: number | undefined;

  criticalRows: Array<number> = [];
  criticalColumns: Array<number> = [];

  win: boolean = false;

  createField() {
    this.field = Array.from({ length: 6 }, () => Array(6).fill(0));
    this.statusField = Array.from({ length: 6}, () => Array(6).fill(Status.CLEAR));

    this.criticalColumns = [];
    this.criticalRows = [];
    this.fillSolutionNumbers();
    this.fillUp();
  }

  fillUp() {
    this.field = this.field.map(row => row.map(n => n === 0 ? Math.floor(Math.random() * 9) + 1 : n));
  }

  getStartNumber(): number {
    switch(this.difficulty) {
      case "easy":
        return Math.floor(Math.random() * 3) + 7;
      case "medium":
        return Math.floor(Math.random() * 3) + 4;
      case "hard":
        return Math.floor(Math.random() * 3) + 1;
      default:
        return 1;
    }
  }

  fillSolutionNumbers() {
    const start = this.getStartNumber();
    for (let i = 9; i >= 1; i--) {
      while (true) {
        let x: number;
        let y: number;
        do {
          x = Math.floor(Math.random() * 6),
          y = Math.floor(Math.random() * 6)
          
        } while (this.field[y][x] !== 0);

        const rowSum = this.field[y].reduce((sum, val) => sum + val, 0);
        const columnSum = this.field.reduce((sum, row) => sum + row[x], 0);

        if (rowSum + i <= 9 && columnSum + i <= 9) {
          this.field[y][x] = i;

          if (i === start) {
            this.statusField[y][x] = Status.MARKED;
            this.pointX = y;
            this.pointY = x;
          }

          break;
        }
      }
    }
  }
  

  constructor() { }

  reset() {
    this.createField();
    this.win = false;
    this.difficulty = this.selectValue;
  }

  select(event: Event) {
    const element = event.target as HTMLSelectElement;
    element.blur();
    this.selectValue = element.value;
  }

  click(x:number, y:number) {
    if ((x === this.pointX && y === this.pointY) || this.win) { return; }
    this.statusField[x][y] = (this.statusField[x][y] + 1) % 3;
    this.check();
  }

  check() {
    for (let i = 0; i < this.field.length; i++) {
      let sum = this.field[i].filter((_v, j) => this.statusField[i][j] === Status.MARKED).reduce((s, v) => s + v, 0);
      if (sum > 9 && !this.criticalRows.includes(i)) {
        this.criticalRows.push(i);
      } else if (this.criticalRows.includes(i) && sum <= 9) {
        this.criticalRows = this.criticalRows.filter(n => n !== i);
      }


      sum = this.field.reduce((s, v) => s + v[i], 0);
      sum = this.field.map(r => r[i]).filter((_v, index) => this.statusField[index][i] === Status.MARKED).reduce((s, v) => s + v, 0);
      if (sum > 9 && !this.criticalColumns.includes(i)) {
        this.criticalColumns.push(i);
      } else if (this.criticalColumns.includes(i) && sum <= 9) {
        this.criticalColumns = this.criticalColumns.filter(n => n !== i);
      }
    }

    let finish = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let nums = [];

    for (let i = 0; i < this.field.length; i++) {
      for (let j = 0; j < this.field[i].length; j++) {
        if (this.statusField[i][j] == Status.MARKED) {
          nums.push(this.field[i][j]);
        }
      }
    }

    nums = nums.sort((a, b) => a - b);

    if (nums.length === finish.length && nums.every((value, index) => value === finish[index])) {
      this.win = true;;
    }
  }

}
