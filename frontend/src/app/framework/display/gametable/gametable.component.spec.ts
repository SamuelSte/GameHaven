import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GametableComponent } from './gametable.component';

describe('GametableComponent', () => {
  let component: GametableComponent;
  let fixture: ComponentFixture<GametableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GametableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GametableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
