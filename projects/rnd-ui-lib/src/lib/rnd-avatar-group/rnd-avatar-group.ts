import { Component, input } from '@angular/core';

@Component({
  imports: [],
  selector: 'rnd-avatar-group',
  styleUrl: './rnd-avatar-group.css',
  templateUrl: './rnd-avatar-group.html',
})
export class RndAvatarGroup {
  overflowCount = input(0);
}
