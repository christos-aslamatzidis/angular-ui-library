import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndKbd } from './rnd-kbd';

describe('RndKbd', () => {
  let component: RndKbd;
  let fixture: ComponentFixture<RndKbd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndKbd],
    }).compileComponents();

    fixture = TestBed.createComponent(RndKbd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
