import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTextarea } from './rnd-textarea';

describe('RndTextarea', () => {
  let component: RndTextarea;
  let fixture: ComponentFixture<RndTextarea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTextarea],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTextarea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
