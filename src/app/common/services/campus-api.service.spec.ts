import { TestBed } from '@angular/core/testing';

import { CampusApiService } from './campus-api.service';

describe('CampusApiService', () => {
  let service: CampusApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampusApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
