import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

    constructor(private router: Router) {}

    categories = ["Denken", "Strategie", "Geschick"];

    navigateToCategory(category: string): void {
      this.router.navigate([`/${category}`]);
    }

}
