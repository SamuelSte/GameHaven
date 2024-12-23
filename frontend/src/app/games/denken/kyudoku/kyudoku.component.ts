import { Component } from '@angular/core';
import { KyudokuHeaderComponent } from "./kyudoku-header/kyudoku-header.component";
import { BoardComponent } from "./board/board.component";
import { KyudokuService } from './kyudoku.service';

@Component({
  selector: 'kyudoku',
  standalone: true,
  imports: [KyudokuHeaderComponent, BoardComponent],
  templateUrl: './kyudoku.component.html',
  styleUrl: './kyudoku.component.scss'
})
export class KyudokuComponent {

  constructor (public ks: KyudokuService) {
    
  }

}
