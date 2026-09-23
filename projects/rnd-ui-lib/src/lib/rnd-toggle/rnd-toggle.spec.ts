import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndToggle } from './rnd-toggle';

describe('RndToggle', () => {
  let component: RndToggle;
  let fixture: ComponentFixture<RndToggle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndToggle],
    }).compileComponents();

    fixture = TestBed.createComponent(RndToggle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
