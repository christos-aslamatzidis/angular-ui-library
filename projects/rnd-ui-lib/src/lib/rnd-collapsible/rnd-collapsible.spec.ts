import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndCollapsible } from './rnd-collapsible';

describe('RndCollapsible', () => {
  let component: RndCollapsible;
  let fixture: ComponentFixture<RndCollapsible>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndCollapsible],
    }).compileComponents();

    fixture = TestBed.createComponent(RndCollapsible);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
