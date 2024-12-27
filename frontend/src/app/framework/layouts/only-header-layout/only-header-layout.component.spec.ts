import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlyHeaderLayoutComponent } from './only-header-layout.component';

describe('OnlyHeaderLayoutComponent', () => {
  let component: OnlyHeaderLayoutComponent;
  let fixture: ComponentFixture<OnlyHeaderLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlyHeaderLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OnlyHeaderLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
