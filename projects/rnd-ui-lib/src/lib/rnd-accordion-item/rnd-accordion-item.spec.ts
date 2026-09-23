import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndAccordion } from '../rnd-accordion/rnd-accordion';
import { RndAccordionItem } from './rnd-accordion-item';

@Component({
  imports: [RndAccordion, RndAccordionItem],
  selector: 'rnd-accordion-item-test-host',
  template: `
    <rnd-accordion>
      <rnd-accordion-item value="a" label="A">Content A</rnd-accordion-item>
    </rnd-accordion>
  `,
})
class RndAccordionItemTestHost {}

describe('RndAccordionItem', () => {
  let fixture: ComponentFixture<RndAccordionItemTestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndAccordionItemTestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RndAccordionItemTestHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
