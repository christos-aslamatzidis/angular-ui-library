import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSplitButton } from './rnd-split-button';

describe('RndSplitButton', () => {
  let component: RndSplitButton;
  let fixture: ComponentFixture<RndSplitButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSplitButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSplitButton);
    fixture.componentRef.setInput('label', 'Send');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
