import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCommandPalette } from './rnd-command-palette';

describe('RndCommandPalette', () => {
  let component: RndCommandPalette;
  let fixture: ComponentFixture<RndCommandPalette>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCommandPalette],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCommandPalette);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
