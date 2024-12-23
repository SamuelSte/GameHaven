import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TictactoeService } from '../tictactoe.service';

@Component({
  selector: 'field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent {
  
  constructor(public ts: TictactoeService) { }

  move(i: number) {
    if (!this.ts.gameRunning) {
      this.ts.gameRunning = true;
    }
    if (this.ts.winner || this.ts.draw) {
      return;
    }
    if (!this.ts.squares[i]) {
      this.ts.squares.splice(i, 1, this.ts.player);

      this.ts.winner = this.calculateWinner(this.ts.squares);
      this.ts.draw = this.checkDraw();

      if (this.ts.local) {
        this.ts.xIsNext = !this.ts.xIsNext;
      } else if (!this.ts.winner && !this.ts.draw) {
        this.botmove();
        this.ts.winner = this.calculateWinner(this.ts.squares);
        this.ts.draw = this.checkDraw();
      }
    }

    this.ts.updateParagraph();
  }

  botmove() {
    for (let i = 0; i < 9; i++) {
      let temp: string[] = this.ts.squares.slice();
      if (!temp[i]) {
        temp[i] = "O";
      }
      if (this.calculateWinner(temp)) {
        this.ts.squares[i] = "O";
        return;
      }
    }

    if (this.ts.difficulty === 'medium' || this.ts.difficulty === 'hard') {
      for (let i = 0; i < 9; i++) {
        let temp: string[] = this.ts.squares.slice();
        if (!temp[i]) {
          temp[i] = "X";
        }
        if (this.calculateWinner(temp)) {
          this.ts.squares[i] = "O";
          return;
        }
      }
    }

    if (this.ts.difficulty === 'hard') {
      if (!this.ts.squares[4]) {
        this.ts.squares[4] = 'O';
        return;
      } else if (!this.ts.squares[0]) {
        this.ts.squares[0] = 'O';
        return;
      } else if (!this.ts.squares[2]) {
        this.ts.squares[2] = 'O';
        return;
      } else if (!this.ts.squares[6]) {
        this.ts.squares[6] = 'O';
        return;
      } else if (!this.ts.squares[8]) {
        this.ts.squares[8] = 'O';
        return;
      } 
    }

    while (true) {
      let x = Math.round(Math.random() * 8);
      if (!this.ts.squares[x]) {
        this.ts.squares[x] = 'O';
        return;
      }
    }
  }

  calculateWinner(squares: string[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return '';
  }

  checkDraw() {
    return this.ts.squares.every(s => s !== null);
  }


}
