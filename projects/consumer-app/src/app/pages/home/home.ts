import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RndButton } from 'rnd-ui-lib';

@Component({
  imports: [RouterLink, RndButton],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {}
