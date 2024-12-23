import { TestBed } from '@angular/core/testing';

import { KyudokuService } from './kyudoku.service';

describe('KyudokuService', () => {
  let service: KyudokuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KyudokuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
