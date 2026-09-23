import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndToastOutlet } from './rnd-toast-outlet';

describe('RndToastOutlet', () => {
  let component: RndToastOutlet;
  let fixture: ComponentFixture<RndToastOutlet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndToastOutlet],
    }).compileComponents();

    fixture = TestBed.createComponent(RndToastOutlet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
