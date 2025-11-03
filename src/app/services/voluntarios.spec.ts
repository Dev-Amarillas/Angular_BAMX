import { TestBed } from '@angular/core/testing';

import { Voluntarios } from './voluntarios';

describe('Voluntarios', () => {
  let service: Voluntarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Voluntarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
