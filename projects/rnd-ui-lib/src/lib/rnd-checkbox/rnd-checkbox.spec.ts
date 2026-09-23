import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCheckbox } from './rnd-checkbox';

describe('RndCheckbox', () => {
  let component: RndCheckbox;
  let fixture: ComponentFixture<RndCheckbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCheckbox],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCheckbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
