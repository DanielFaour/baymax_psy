import { TestBed } from '@angular/core/testing';

import { OpenRouterService } from './openrouter.service.js';

describe('OpenRouterService', () => {
  let service: OpenRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
