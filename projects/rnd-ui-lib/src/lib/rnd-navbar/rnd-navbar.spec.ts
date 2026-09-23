import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndNavbar } from './rnd-navbar';

describe('RndNavbar', () => {
  let component: RndNavbar;
  let fixture: ComponentFixture<RndNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndNavbar],
    }).compileComponents();

    fixture = TestBed.createComponent(RndNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
