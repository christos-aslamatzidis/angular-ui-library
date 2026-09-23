import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndEmptyState } from './rnd-empty-state';

describe('RndEmptyState', () => {
  let component: RndEmptyState;
  let fixture: ComponentFixture<RndEmptyState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndEmptyState],
    }).compileComponents();

    fixture = TestBed.createComponent(RndEmptyState);
    fixture.componentRef.setInput('title', 'No transactions yet');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
