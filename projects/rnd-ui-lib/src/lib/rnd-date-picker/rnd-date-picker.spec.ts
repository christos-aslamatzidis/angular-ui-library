import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndDatePicker } from './rnd-date-picker';

describe('RndDatePicker', () => {
  let component: RndDatePicker;
  let fixture: ComponentFixture<RndDatePicker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndDatePicker],
    }).compileComponents();

    fixture = TestBed.createComponent(RndDatePicker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
