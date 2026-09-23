import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSkeleton } from './rnd-skeleton';

describe('RndSkeleton', () => {
  let component: RndSkeleton;
  let fixture: ComponentFixture<RndSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSkeleton],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSkeleton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
