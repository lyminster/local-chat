import { TestBed } from '@angular/core/testing';

import { LoginNameService } from './login-name.service';

describe('LoginNameService', () => {
  let service: LoginNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
