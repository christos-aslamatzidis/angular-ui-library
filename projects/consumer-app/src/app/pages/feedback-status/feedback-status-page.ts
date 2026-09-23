import { Component } from '@angular/core';
import {
  RndAlert,
  RndButton,
  RndEmptyState,
  RndIcon,
  RndProgressBar,
  RndRadialProgress,
  RndSkeleton,
  RndSparkline,
  RndSpinner,
  RndStatCard,
  RndTimeline,
  RndTimelineItem,
} from 'rnd-ui-lib';

@Component({
  imports: [
    RndAlert,
    RndProgressBar,
    RndRadialProgress,
    RndSparkline,
    RndSkeleton,
    RndSpinner,
    RndStatCard,
    RndTimeline,
    RndTimelineItem,
    RndEmptyState,
    RndButton,
    RndIcon,
  ],
  selector: 'app-feedback-status-page',
  styleUrl: './feedback-status-page.css',
  templateUrl: './feedback-status-page.html',
})
export class FeedbackStatusPage {
  protected sparklineUpData = [10, 12, 11, 14, 18, 17, 22, 25];
  protected sparklineDownData = [25, 23, 24, 20, 18, 16, 14, 12];
}
