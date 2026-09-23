import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSearchInput } from './rnd-search-input';

describe('RndSearchInput', () => {
  let component: RndSearchInput;
  let fixture: ComponentFixture<RndSearchInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSearchInput],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSearchInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
