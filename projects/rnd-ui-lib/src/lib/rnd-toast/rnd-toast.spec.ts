import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndToast } from './rnd-toast';

describe('RndToast', () => {
  let component: RndToast;
  let fixture: ComponentFixture<RndToast>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndToast],
    }).compileComponents();

    fixture = TestBed.createComponent(RndToast);
    fixture.componentRef.setInput('message', 'Transaction confirmed');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
