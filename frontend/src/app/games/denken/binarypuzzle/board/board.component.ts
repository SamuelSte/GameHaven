import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { BinaryPuzzleService, Status } from '../binarypuzzle.service';

@Component({
  selector: 'board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent implements OnInit, OnDestroy{

  public Status = Status;

  constructor (public bs: BinaryPuzzleService) {}

  ngOnInit() {
  
  }

  ngOnDestroy(): void {
    this.bs.save();
  }

  @HostListener('window:beforeunload', ['$event'])
    handleBeforeUnload(event: Event) {
      this.bs.save();
    }

}
