import { Component } from '@angular/core';
import {
  RndCheckbox,
  RndFormField,
  RndInput,
  RndInputOtp,
  RndNumberStepper,
  RndPasswordInput,
  RndRadioGroup,
  RndRadioOption,
  RndSearchInput,
  RndSelect,
  RndSelectOption,
  RndSlider,
  RndSwitch,
  RndTagInput,
  RndTextarea,
} from 'rnd-ui-lib';

@Component({
  imports: [
    RndInput,
    RndTextarea,
    RndPasswordInput,
    RndSearchInput,
    RndNumberStepper,
    RndInputOtp,
    RndTagInput,
    RndSelect,
    RndCheckbox,
    RndRadioGroup,
    RndRadioOption,
    RndSwitch,
    RndFormField,
    RndSlider,
  ],
  selector: 'app-form-inputs-page',
  styleUrl: './form-inputs-page.css',
  templateUrl: './form-inputs-page.html',
})
export class FormInputsPage {
  protected selectOptions: RndSelectOption[] = [
    { label: 'Bitcoin', value: 'btc' },
    { label: 'Ethereum', value: 'eth' },
    { label: 'Solana', value: 'sol' },
  ];
}
