import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndRadialProgress } from './rnd-radial-progress';

describe('RndRadialProgress', () => {
  let component: RndRadialProgress;
  let fixture: ComponentFixture<RndRadialProgress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndRadialProgress],
    }).compileComponents();

    fixture = TestBed.createComponent(RndRadialProgress);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
