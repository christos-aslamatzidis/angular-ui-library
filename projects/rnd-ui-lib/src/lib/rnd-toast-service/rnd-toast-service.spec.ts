import { TestBed } from '@angular/core/testing';
import { RndToastService } from './rnd-toast-service';

describe('RndToastService', () => {
  let service: RndToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RndToastService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('adds a toast entry on show and removes it on dismiss', () => {
    const id = service.show('Hello');
    expect(service.entries()).toEqual([{ id, message: 'Hello', variant: 'info' }]);

    service.dismiss(id);
    expect(service.entries()).toEqual([]);
  });
});
