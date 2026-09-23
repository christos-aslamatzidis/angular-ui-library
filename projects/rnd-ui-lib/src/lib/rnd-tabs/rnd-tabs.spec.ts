import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTabs } from './rnd-tabs';

describe('RndTabs', () => {
  let component: RndTabs;
  let fixture: ComponentFixture<RndTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTabs],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
