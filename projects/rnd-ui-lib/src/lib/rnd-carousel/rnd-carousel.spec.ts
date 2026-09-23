import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCarousel } from './rnd-carousel';

describe('RndCarousel', () => {
  let component: RndCarousel;
  let fixture: ComponentFixture<RndCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCarousel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
