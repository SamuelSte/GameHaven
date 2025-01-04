import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TictactoeService } from '../tictactoe.service';

@Component({
  selector: 'field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field.component.html',
  styleUrl: './field.component.scss'
})
export class FieldComponent implements OnInit{
  
  constructor(public ts: TictactoeService) { }

  ngOnInit(): void {
    this.ts.reset();
  }

}
