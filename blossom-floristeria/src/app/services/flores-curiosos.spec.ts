import { TestBed } from '@angular/core/testing';
import { FloresCuriososService } from './flores-curiosos';

describe('FloresCuriososService', () => {
  let service: FloresCuriososService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloresCuriososService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});