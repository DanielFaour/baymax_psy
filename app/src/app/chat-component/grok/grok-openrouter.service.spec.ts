import { TestBed } from '@angular/core/testing';

import { GrokOpenRouterService } from './grok-openrouter.service.js';

describe('GrokOpenRouterService', () => {
  let service: GrokOpenRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GrokOpenRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
