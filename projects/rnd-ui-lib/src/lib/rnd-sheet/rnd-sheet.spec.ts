import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSheet } from './rnd-sheet';

describe('RndSheet', () => {
  let component: RndSheet;
  let fixture: ComponentFixture<RndSheet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSheet],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSheet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
