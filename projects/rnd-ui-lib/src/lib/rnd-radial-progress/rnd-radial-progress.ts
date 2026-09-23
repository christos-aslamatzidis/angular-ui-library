import { Component, computed, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-radial-progress',
  styleUrl: './rnd-radial-progress.css',
  templateUrl: './rnd-radial-progress.html',
})
export class RndRadialProgress {
  value = input(0);
  size = input(80);
  strokeWidth = input(8);

  protected clampedValue = computed(() => Math.min(100, Math.max(0, this.value())));
  protected radius = computed(() => (this.size() - this.strokeWidth()) / 2);
  protected center = computed(() => this.size() / 2);
  protected circumference = computed(() => 2 * Math.PI * this.radius());
  protected offset = computed(() => this.circumference() * (1 - this.clampedValue() / 100));
}
