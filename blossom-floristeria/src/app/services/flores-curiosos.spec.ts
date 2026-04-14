import { TestBed } from '@angular/core/testing';

import { FloresCuriosos } from './flores-curiosos';

describe('FloresCuriosos', () => {
  let service: FloresCuriosos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloresCuriosos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
