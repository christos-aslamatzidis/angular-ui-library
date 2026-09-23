import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndDropdownMenu } from './rnd-dropdown-menu';

describe('RndDropdownMenu', () => {
  let component: RndDropdownMenu;
  let fixture: ComponentFixture<RndDropdownMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndDropdownMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(RndDropdownMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
