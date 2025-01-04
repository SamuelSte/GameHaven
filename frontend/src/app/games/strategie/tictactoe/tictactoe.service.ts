import { Injectable } from '@angular/core';
import { GameService } from '../../game.service';

@Injectable({
  providedIn: 'root'
})
export class TictactoeService {

  xIsNext: boolean = true;
  winner: string = '';
  draw: boolean = false;
  running: boolean = false;

  paragraph: string = 'Spieler X ist dran';

  squares: string[] = Array(9).fill(null);

  local: boolean = true;

  difficulty: string = '';
  name: string = "tictactoe";

  async reset() {
    await this.gameService.loadUsername();

    if (this.gameService.getUsername() !== '' && this.difficulty !== '') {
      await this.gameService.load(this.name, this.difficulty);

      if (!this.gameService.getStat()?.data) {
        this.gameService.createStat(this.name, this.difficulty);
      }

      if (!this.draw && this.winner === '' && this.running) {
        this.gameService.updateStat(this.name, this.difficulty, false);
      }
    }

    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = '';
    this.draw = false;
    this.running = false;
    this.updateParagraph();
  }

  async setStats(win: boolean) {
    await this.gameService.loadUsername();

    if (this.gameService.getUsername() !== '' || this.difficulty !== '') {
      await this.gameService.load(this.name, this.difficulty);

      if (!this.gameService.getStat()?.data) {
        this.gameService.createStat(this.name, this.difficulty);
      }

      this.gameService.updateStat(this.name, this.difficulty, win);
      
    }
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  constructor(private gameService: GameService) { }

  async updateParagraph() {
    if (this.local) {
      if (this.winner) {
        this.paragraph = "Spieler " + this.winner + " hat gewonnen";
      } else if (this.draw) {
        this.paragraph = "Unentschieden";
      } else {
        this.paragraph = "Spieler " + this.player + " ist an der Reihe";
      }
    } else {
      if (this.winner === "X") {
        this.paragraph = "Du hast gewonnen";
        await this.setStats(true);
      } else if (this.winner === "O") {
        this.paragraph = "Du hast verloren";
        await this.setStats(false);
      } else if (this.draw) {
        this.paragraph = "Unentschieden";
        await this.setStats(false);
      } else {
        this.paragraph = "";
      }
    }
  }

  async select(event: Event) {
    const element = event.target as HTMLSelectElement;
    const val = element.value;
    element.blur();
    await this.reset();
    if (val === "local") {
      this.local = true;
      this.difficulty = '';
    } else {
      this.local = false;
      this.difficulty = val;
    }
    await this.updateParagraph();
  }

  move(i: number) {
    if (!this.running) {
      this.running = true;
    }

    if (this.winner || this.draw) {
      return;
    }
    if (!this.squares[i]) {
      this.squares.splice(i, 1, this.player);

      this.winner = this.calculateWinner(this.squares);
      this.draw = this.checkDraw();

      if (this.local) {
        this.xIsNext = !this.xIsNext;
      } else if (!this.winner && !this.draw) {
        this.botmove();
        this.winner = this.calculateWinner(this.squares);
        this.draw = this.checkDraw();
      }
    }

    this.updateParagraph();
  }

  botmove() {
    for (let i = 0; i < 9; i++) {
      let temp: string[] = this.squares.slice();
      if (!temp[i]) {
        temp[i] = "O";
      }
      if (this.calculateWinner(temp)) {
        this.squares[i] = "O";
        return;
      }
    }

    if (this.difficulty === 'medium' || this.difficulty === 'hard') {
      for (let i = 0; i < 9; i++) {
        let temp: string[] = this.squares.slice();
        if (!temp[i]) {
          temp[i] = "X";
        }
        if (this.calculateWinner(temp)) {
          this.squares[i] = "O";
          return;
        }
      }
    }

    if (this.difficulty === 'hard') {
      if (!this.squares[4]) {
        this.squares[4] = 'O';
        return;
      } else if (!this.squares[0]) {
        this.squares[0] = 'O';
        return;
      } else if (!this.squares[2]) {
        this.squares[2] = 'O';
        return;
      } else if (!this.squares[6]) {
        this.squares[6] = 'O';
        return;
      } else if (!this.squares[8]) {
        this.squares[8] = 'O';
        return;
      } 
    }

    while (true) {
      let x = Math.round(Math.random() * 8);
      if (!this.squares[x]) {
        this.squares[x] = 'O';
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
    return this.squares.every(s => s !== null);
  }

}
