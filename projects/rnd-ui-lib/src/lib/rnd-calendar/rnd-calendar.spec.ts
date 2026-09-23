import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCalendar } from './rnd-calendar';

describe('RndCalendar', () => {
  let component: RndCalendar;
  let fixture: ComponentFixture<RndCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
