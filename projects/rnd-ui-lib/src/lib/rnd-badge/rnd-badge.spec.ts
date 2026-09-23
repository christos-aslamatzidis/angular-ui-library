import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndBadge } from './rnd-badge';

describe('RndBadge', () => {
  let component: RndBadge;
  let fixture: ComponentFixture<RndBadge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndBadge],
    }).compileComponents();

    fixture = TestBed.createComponent(RndBadge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
