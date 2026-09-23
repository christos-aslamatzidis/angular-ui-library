import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTimePicker } from './rnd-time-picker';

describe('RndTimePicker', () => {
  let component: RndTimePicker;
  let fixture: ComponentFixture<RndTimePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTimePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTimePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
