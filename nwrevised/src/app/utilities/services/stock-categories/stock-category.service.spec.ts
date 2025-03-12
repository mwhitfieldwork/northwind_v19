import { TestBed } from '@angular/core/testing';

import { StockCategoryService } from './stock-category.service'

describe('StockCategoryService', () => {
  let service: StockCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
