import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTimeline } from './rnd-timeline';

describe('RndTimeline', () => {
  let component: RndTimeline;
  let fixture: ComponentFixture<RndTimeline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTimeline],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTimeline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
