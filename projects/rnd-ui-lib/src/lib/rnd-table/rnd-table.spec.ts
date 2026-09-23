import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTable } from './rnd-table';

describe('RndTable', () => {
  let component: RndTable;
  let fixture: ComponentFixture<RndTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTable],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
