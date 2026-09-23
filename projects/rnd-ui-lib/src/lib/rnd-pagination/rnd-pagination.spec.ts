import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndPagination } from './rnd-pagination';

describe('RndPagination', () => {
  let component: RndPagination;
  let fixture: ComponentFixture<RndPagination>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndPagination],
    }).compileComponents();

    fixture = TestBed.createComponent(RndPagination);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
