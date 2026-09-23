import { provideRouter } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndRouteProgress } from './rnd-route-progress';

describe('RndRouteProgress', () => {
  let component: RndRouteProgress;
  let fixture: ComponentFixture<RndRouteProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndRouteProgress],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(RndRouteProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
