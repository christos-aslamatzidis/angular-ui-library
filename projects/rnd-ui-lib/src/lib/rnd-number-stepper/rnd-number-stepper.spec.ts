import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndNumberStepper } from './rnd-number-stepper';

describe('RndNumberStepper', () => {
  let component: RndNumberStepper;
  let fixture: ComponentFixture<RndNumberStepper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndNumberStepper],
    }).compileComponents();

    fixture = TestBed.createComponent(RndNumberStepper);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
