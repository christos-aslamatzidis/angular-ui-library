import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndAccordion } from './rnd-accordion';

describe('RndAccordion', () => {
  let component: RndAccordion;
  let fixture: ComponentFixture<RndAccordion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndAccordion],
    }).compileComponents();

    fixture = TestBed.createComponent(RndAccordion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
