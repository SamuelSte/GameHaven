import { Component } from '@angular/core';
import { KyudokuService } from '../kyudoku.service';

@Component({
  selector: 'kyudoku-header',
  standalone: true,
  imports: [],
  templateUrl: './kyudoku-header.component.html',
  styleUrl: './kyudoku-header.component.scss'
})
export class KyudokuHeaderComponent {

  constructor(public ks: KyudokuService) {}

}
