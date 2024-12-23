import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KyudokuComponent } from './kyudoku.component';

describe('KyudokuComponent', () => {
  let component: KyudokuComponent;
  let fixture: ComponentFixture<KyudokuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KyudokuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KyudokuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
