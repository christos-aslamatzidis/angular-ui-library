import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSparkline } from './rnd-sparkline';

describe('RndSparkline', () => {
  let component: RndSparkline;
  let fixture: ComponentFixture<RndSparkline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSparkline],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSparkline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
