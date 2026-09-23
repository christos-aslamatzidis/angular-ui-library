import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSelect } from './rnd-select';

describe('RndSelect', () => {
  let component: RndSelect;
  let fixture: ComponentFixture<RndSelect>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSelect],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSelect);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
