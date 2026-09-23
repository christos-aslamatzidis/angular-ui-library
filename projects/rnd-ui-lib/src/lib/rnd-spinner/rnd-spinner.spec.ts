import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSpinner } from './rnd-spinner';

describe('RndSpinner', () => {
  let component: RndSpinner;
  let fixture: ComponentFixture<RndSpinner>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSpinner],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSpinner);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
