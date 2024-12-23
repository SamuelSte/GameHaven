import { Component } from '@angular/core';
import { TictactoeService } from '../tictactoe.service';

@Component({
  selector: 'tictactoe-header',
  standalone: true,
  imports: [],
  templateUrl: './tictactoe-header.component.html',
  styleUrl: './tictactoe-header.component.scss'
})
export class TictactoeHeaderComponent {

    constructor (public ts: TictactoeService) { }

}
