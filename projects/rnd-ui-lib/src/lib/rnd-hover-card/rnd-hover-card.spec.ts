import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndHoverCard } from './rnd-hover-card';

describe('RndHoverCard', () => {
  let component: RndHoverCard;
  let fixture: ComponentFixture<RndHoverCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndHoverCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RndHoverCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
