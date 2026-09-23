import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSegmentedControl } from './rnd-segmented-control';

describe('RndSegmentedControl', () => {
  let component: RndSegmentedControl;
  let fixture: ComponentFixture<RndSegmentedControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSegmentedControl],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSegmentedControl);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
