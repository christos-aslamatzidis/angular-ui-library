import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCarouselSlide } from './rnd-carousel-slide';

describe('RndCarouselSlide', () => {
  let component: RndCarouselSlide;
  let fixture: ComponentFixture<RndCarouselSlide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCarouselSlide],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCarouselSlide);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
