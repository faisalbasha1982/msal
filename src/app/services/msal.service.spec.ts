import { TestBed } from '@angular/core/testing';

import { MsalService } from './msal.service';

describe('MsalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MsalService = TestBed.get(MsalService);
    expect(service).toBeTruthy();
  });
});
