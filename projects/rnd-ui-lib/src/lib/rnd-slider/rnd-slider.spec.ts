import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSlider } from './rnd-slider';

describe('RndSlider', () => {
  let component: RndSlider;
  let fixture: ComponentFixture<RndSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSlider],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSlider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
