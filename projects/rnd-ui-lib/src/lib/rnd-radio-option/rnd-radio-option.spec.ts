import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndRadioGroup } from '../rnd-radio-group/rnd-radio-group';
import { RndRadioOption } from './rnd-radio-option';

@Component({
  imports: [RndRadioGroup, RndRadioOption],
  selector: 'rnd-radio-option-test-host',
  template: `
    <rnd-radio-group>
      <rnd-radio-option value="a" />
    </rnd-radio-group>
  `,
})
class RndRadioOptionTestHost {}

describe('RndRadioOption', () => {
  let fixture: ComponentFixture<RndRadioOptionTestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndRadioOptionTestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RndRadioOptionTestHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
