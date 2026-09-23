import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTooltip } from './rnd-tooltip';

describe('RndTooltip', () => {
  let component: RndTooltip;
  let fixture: ComponentFixture<RndTooltip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTooltip],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTooltip);
    fixture.componentRef.setInput('text', 'Tooltip text');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
