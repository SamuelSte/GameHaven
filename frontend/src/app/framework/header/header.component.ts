import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from './header.service';

@Component({
  selector: 'header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(private router: Router, public headerService: HeaderService) {}

  home(): void {
    this.router.navigate([``]);
  }

}
