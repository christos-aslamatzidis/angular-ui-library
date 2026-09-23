import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndPasswordInput } from './rnd-password-input';

describe('RndPasswordInput', () => {
  let component: RndPasswordInput;
  let fixture: ComponentFixture<RndPasswordInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndPasswordInput],
    }).compileComponents();

    fixture = TestBed.createComponent(RndPasswordInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
