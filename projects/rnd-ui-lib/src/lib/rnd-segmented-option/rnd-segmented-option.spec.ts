import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSegmentedControl } from '../rnd-segmented-control/rnd-segmented-control';
import { RndSegmentedOption } from './rnd-segmented-option';

@Component({
  imports: [RndSegmentedControl, RndSegmentedOption],
  selector: 'rnd-segmented-option-test-host',
  template: `
    <rnd-segmented-control>
      <rnd-segmented-option value="a">A</rnd-segmented-option>
    </rnd-segmented-control>
  `,
})
class RndSegmentedOptionTestHost {}

describe('RndSegmentedOption', () => {
  let fixture: ComponentFixture<RndSegmentedOptionTestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSegmentedOptionTestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSegmentedOptionTestHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
