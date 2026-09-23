import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSwitch } from './rnd-switch';

describe('RndSwitch', () => {
  let component: RndSwitch;
  let fixture: ComponentFixture<RndSwitch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSwitch],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSwitch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
