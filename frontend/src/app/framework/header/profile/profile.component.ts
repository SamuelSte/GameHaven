import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../header.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  constructor(public headerService: HeaderService) {}

  ngOnInit(): void {
      this.headerService.loadUsername();
  }


}
