import { Component, inject } from '@angular/core';
import { RndToast } from '../rnd-toast/rnd-toast';
import { RndToastService } from '../rnd-toast-service/rnd-toast-service';

@Component({
  imports: [RndToast],
  selector: 'rnd-toast-outlet',
  styleUrl: './rnd-toast-outlet.css',
  templateUrl: './rnd-toast-outlet.html',
})
export class RndToastOutlet {
  protected toastService = inject(RndToastService);
}
