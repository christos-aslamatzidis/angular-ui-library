import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndSidebar } from './rnd-sidebar';

describe('RndSidebar', () => {
  let component: RndSidebar;
  let fixture: ComponentFixture<RndSidebar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndSidebar],
    }).compileComponents();

    fixture = TestBed.createComponent(RndSidebar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
