import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCombobox } from './rnd-combobox';

describe('RndCombobox', () => {
  let component: RndCombobox;
  let fixture: ComponentFixture<RndCombobox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCombobox],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCombobox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
