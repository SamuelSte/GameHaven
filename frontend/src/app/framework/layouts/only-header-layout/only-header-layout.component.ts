import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'only-header-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './only-header-layout.component.html',
  styleUrl: './only-header-layout.component.scss'
})
export class OnlyHeaderLayoutComponent {

}
