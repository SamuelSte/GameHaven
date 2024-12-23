import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { KyudokuService, Status } from '../kyudoku.service';

@Component({
  selector: 'board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  public Status = Status;

  constructor (public ks: KyudokuService) {
    
  }

  ngOnInit() {
    this.ks.createField();
  }

}
