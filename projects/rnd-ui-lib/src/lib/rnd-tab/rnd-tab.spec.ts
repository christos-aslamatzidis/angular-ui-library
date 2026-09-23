import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTab } from './rnd-tab';
import { RndTabs } from '../rnd-tabs/rnd-tabs';

@Component({
  imports: [RndTabs, RndTab],
  selector: 'rnd-tab-test-host',
  template: `
    <rnd-tabs>
      <rnd-tab value="a">A</rnd-tab>
    </rnd-tabs>
  `,
})
class RndTabTestHost {}

describe('RndTab', () => {
  let fixture: ComponentFixture<RndTabTestHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTabTestHost],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTabTestHost);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});
