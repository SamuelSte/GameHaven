import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { KyudokuService, Status } from '../kyudoku.service';

@Component({
  selector: 'board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy{

  public Status = Status;

  constructor (public ks: KyudokuService) {
    
  }

  ngOnInit() {
    this.ks.createField();
  }

  ngOnDestroy() {
    this.ks.save();
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event) {
    this.ks.save();
  }

}
