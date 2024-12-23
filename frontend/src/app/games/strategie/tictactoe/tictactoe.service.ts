import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TictactoeService {

  xIsNext: boolean = true;
  winner: string = '';
  draw: boolean = false;
  paragraph: string = 'Spieler X ist dran';
  gameRunning: boolean = false;
  squares: string[] = Array(9).fill(null);
  local: boolean = true;
  difficulty: string = '';

  reset() {
    this.gameRunning = false;
    this.squares = Array(9).fill(null);
    this.xIsNext = true;
    this.winner = '';
    this.draw = false;
    this.updateParagraph();
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  constructor() { }

  updateParagraph() {

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
      } else if (this.winner === "O") {
        this.paragraph = "Du hast verloren";
      } else if (this.draw) {
        this.paragraph = "Unentschieden";
      } else {
        this.paragraph = "";
      }
    }
  }

  select(event: Event) {
    const element = event.target as HTMLSelectElement;
    const val = element.value;
    element.blur();
    if (val === "local") {
      this.local = true;
    } else {
      this.local = false;
      this.difficulty = val;
    }
    this.updateParagraph();
  }

}
