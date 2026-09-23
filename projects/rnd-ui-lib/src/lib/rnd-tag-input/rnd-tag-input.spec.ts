import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTagInput } from './rnd-tag-input';

describe('RndTagInput', () => {
  let component: RndTagInput;
  let fixture: ComponentFixture<RndTagInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTagInput],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTagInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
