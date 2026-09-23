import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndInput } from './rnd-input';

describe('RndInput', () => {
  let component: RndInput;
  let fixture: ComponentFixture<RndInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndInput],
    }).compileComponents();

    fixture = TestBed.createComponent(RndInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
