import { Component } from '@angular/core';
import {
  RndButton,
  RndCopyField,
  RndDropdownItem,
  RndIcon,
  RndSegmentedControl,
  RndSegmentedOption,
  RndSplitButton,
  RndToggle,
} from 'rnd-ui-lib';

@Component({
  imports: [
    RndButton,
    RndIcon,
    RndSplitButton,
    RndDropdownItem,
    RndToggle,
    RndSegmentedControl,
    RndSegmentedOption,
    RndCopyField,
  ],
  selector: 'app-buttons-triggers-page',
  styleUrl: './buttons-triggers-page.css',
  templateUrl: './buttons-triggers-page.html',
})
export class ButtonsTriggersPage {}
