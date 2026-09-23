import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCopyField } from './rnd-copy-field';

describe('RndCopyField', () => {
  let component: RndCopyField;
  let fixture: ComponentFixture<RndCopyField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCopyField],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCopyField);
    fixture.componentRef.setInput('value', 'bc1qxyz');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
