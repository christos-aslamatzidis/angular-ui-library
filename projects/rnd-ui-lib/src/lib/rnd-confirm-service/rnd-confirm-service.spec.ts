import { TestBed } from '@angular/core/testing';
import { RndConfirmService } from './rnd-confirm-service';

describe('RndConfirmService', () => {
  let service: RndConfirmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RndConfirmService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('resolves the promise and clears the request on respond', async () => {
    const resultPromise = service.confirm({ title: 'Delete wallet?' });

    expect(service.current()?.title).toBe('Delete wallet?');

    service.respond(true);

    await expect(resultPromise).resolves.toBe(true);
    expect(service.current()).toBeNull();
  });
});
