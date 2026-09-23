import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndDropdownItem } from './rnd-dropdown-item';

describe('RndDropdownItem', () => {
  let component: RndDropdownItem;
  let fixture: ComponentFixture<RndDropdownItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndDropdownItem],
    }).compileComponents();

    fixture = TestBed.createComponent(RndDropdownItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
