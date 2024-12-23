import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TictactoeHeaderComponent } from './tictactoe-header.component';

describe('TictactoeHeaderComponent', () => {
  let component: TictactoeHeaderComponent;
  let fixture: ComponentFixture<TictactoeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TictactoeHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TictactoeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
