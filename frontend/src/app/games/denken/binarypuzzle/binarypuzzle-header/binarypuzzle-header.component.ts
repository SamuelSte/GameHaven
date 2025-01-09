import { Component } from '@angular/core';
import { BinaryPuzzleService } from '../binarypuzzle.service';

@Component({
  selector: 'binarypuzzle-header',
  standalone: true,
  imports: [],
  templateUrl: './binarypuzzle-header.component.html',
  styleUrl: './binarypuzzle-header.component.scss'
})
export class BinarypuzzleHeaderComponent {

  constructor (public bs: BinaryPuzzleService) {}

}
