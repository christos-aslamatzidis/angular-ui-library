import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndFormField } from './rnd-form-field';

describe('RndFormField', () => {
  let component: RndFormField;
  let fixture: ComponentFixture<RndFormField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndFormField],
    }).compileComponents();

    fixture = TestBed.createComponent(RndFormField);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
