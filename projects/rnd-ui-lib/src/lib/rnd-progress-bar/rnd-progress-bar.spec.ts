import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndProgressBar } from './rnd-progress-bar';

describe('RndProgressBar', () => {
  let component: RndProgressBar;
  let fixture: ComponentFixture<RndProgressBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndProgressBar],
    }).compileComponents();

    fixture = TestBed.createComponent(RndProgressBar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
