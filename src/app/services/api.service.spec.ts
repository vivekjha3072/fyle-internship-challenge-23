import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule , HttpClientTestingModule],
      providers: [ApiService]
    });
    service = TestBed.inject(ApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should retrieve user data via GET', () => {
    const mockUserData = { login: 'testUser', name: 'Test User' };

    service.getUser('testUser').subscribe(data => {
      expect(data).toEqual(mockUserData);
    });

    const req = httpTestingController.expectOne('https://api.github.com/users/testUser');
    expect(req.request.method).toEqual('GET');
    req.flush(mockUserData);
  });
});
