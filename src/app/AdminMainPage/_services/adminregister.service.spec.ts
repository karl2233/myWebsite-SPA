/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminregisterService } from './adminregister.service';

describe('Service: Adminregister', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminregisterService]
    });
  });

  it('should ...', inject([AdminregisterService], (service: AdminregisterService) => {
    expect(service).toBeTruthy();
  }));
});
