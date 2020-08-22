/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisterserviceService } from './registerservice.service';

describe('Service: Registerservice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterserviceService]
    });
  });

  it('should ...', inject([RegisterserviceService], (service: RegisterserviceService) => {
    expect(service).toBeTruthy();
  }));
});
