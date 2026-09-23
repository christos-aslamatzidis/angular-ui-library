import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndStatCard } from './rnd-stat-card';

describe('RndStatCard', () => {
  let component: RndStatCard;
  let fixture: ComponentFixture<RndStatCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndStatCard],
    }).compileComponents();

    fixture = TestBed.createComponent(RndStatCard);
    fixture.componentRef.setInput('label', 'Balance');
    fixture.componentRef.setInput('value', '0.42 BTC');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
