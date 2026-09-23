import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndConfirmOutlet } from './rnd-confirm-outlet';

describe('RndConfirmOutlet', () => {
  let component: RndConfirmOutlet;
  let fixture: ComponentFixture<RndConfirmOutlet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndConfirmOutlet],
    }).compileComponents();

    fixture = TestBed.createComponent(RndConfirmOutlet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
