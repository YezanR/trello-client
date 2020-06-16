import { TestBed } from '@angular/core/testing';

import { ShareRequestService } from './share-request.service';

describe('ShareRequestService', () => {
  let service: ShareRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
