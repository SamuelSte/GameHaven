import { Component } from '@angular/core';
import { FieldComponent } from "./field/field.component";
import { TictactoeHeaderComponent } from "./tictactoe-header/tictactoe-header.component";

@Component({
  selector: 'tictactoe',
  standalone: true,
  imports: [FieldComponent, TictactoeHeaderComponent],
  templateUrl: './tictactoe.component.html',
  styleUrl: './tictactoe.component.scss'
})
export class TictactoeComponent{

}
