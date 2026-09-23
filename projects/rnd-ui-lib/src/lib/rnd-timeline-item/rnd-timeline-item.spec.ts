import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTimelineItem } from './rnd-timeline-item';

describe('RndTimelineItem', () => {
  let component: RndTimelineItem;
  let fixture: ComponentFixture<RndTimelineItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTimelineItem],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTimelineItem);
    fixture.componentRef.setInput('step', 1);
    fixture.componentRef.setInput('title', 'Connect wallet');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
