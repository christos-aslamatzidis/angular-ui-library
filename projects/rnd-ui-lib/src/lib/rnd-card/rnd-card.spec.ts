import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCard } from './rnd-card';

describe('RndCard', () => {
  let component: RndCard;
  let fixture: ComponentFixture<RndCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
