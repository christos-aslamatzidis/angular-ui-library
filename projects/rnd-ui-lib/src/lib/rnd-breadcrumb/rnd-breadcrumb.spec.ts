import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndBreadcrumb } from './rnd-breadcrumb';

describe('RndBreadcrumb', () => {
  let component: RndBreadcrumb;
  let fixture: ComponentFixture<RndBreadcrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndBreadcrumb],
    }).compileComponents();

    fixture = TestBed.createComponent(RndBreadcrumb);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
