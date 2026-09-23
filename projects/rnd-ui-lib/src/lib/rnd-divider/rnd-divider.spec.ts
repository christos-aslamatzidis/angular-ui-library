import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndDivider } from './rnd-divider';

describe('RndDivider', () => {
  let component: RndDivider;
  let fixture: ComponentFixture<RndDivider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndDivider],
    }).compileComponents();

    fixture = TestBed.createComponent(RndDivider);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
