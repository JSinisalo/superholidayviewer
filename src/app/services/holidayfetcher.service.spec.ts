import { TestBed, inject } from '@angular/core/testing';

import { HolidayfetcherService } from './holidayfetcher.service';

describe('HolidayfetcherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HolidayfetcherService]
    });
  });

  it('should be created', inject([HolidayfetcherService], (service: HolidayfetcherService) => {
    expect(service).toBeTruthy();
  }));
});
