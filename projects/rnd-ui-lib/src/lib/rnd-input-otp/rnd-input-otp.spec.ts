import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndInputOtp } from './rnd-input-otp';

describe('RndInputOtp', () => {
  let component: RndInputOtp;
  let fixture: ComponentFixture<RndInputOtp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndInputOtp],
    }).compileComponents();

    fixture = TestBed.createComponent(RndInputOtp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
