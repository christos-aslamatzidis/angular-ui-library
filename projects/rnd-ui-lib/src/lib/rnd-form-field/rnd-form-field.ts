import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-form-field',
  styleUrl: './rnd-form-field.css',
  templateUrl: './rnd-form-field.html',
})
export class RndFormField {
  label = input<string>();
  hint = input<string>();
  error = input<string>();
  required = input(false);
}
