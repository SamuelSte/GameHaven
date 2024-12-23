import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyudokuHeaderComponent } from './kyudoku-header.component';

describe('KyudokuHeaderComponent', () => {
  let component: KyudokuHeaderComponent;
  let fixture: ComponentFixture<KyudokuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KyudokuHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KyudokuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
