import { Component } from '@angular/core';
import { BinarypuzzleHeaderComponent } from "./binarypuzzle-header/binarypuzzle-header.component";
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'binarypuzzle',
  standalone: true,
  imports: [BinarypuzzleHeaderComponent, BoardComponent],
  templateUrl: './binarypuzzle.component.html',
  styleUrl: './binarypuzzle.component.scss'
})
export class BinarypuzzleComponent {

}
