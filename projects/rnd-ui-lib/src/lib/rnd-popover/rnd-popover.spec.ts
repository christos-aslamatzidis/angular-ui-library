import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndPopover } from './rnd-popover';

describe('RndPopover', () => {
  let component: RndPopover;
  let fixture: ComponentFixture<RndPopover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndPopover],
    }).compileComponents();

    fixture = TestBed.createComponent(RndPopover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
