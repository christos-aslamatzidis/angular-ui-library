import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndAlert } from './rnd-alert';

describe('RndAlert', () => {
  let component: RndAlert;
  let fixture: ComponentFixture<RndAlert>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndAlert],
    }).compileComponents();

    fixture = TestBed.createComponent(RndAlert);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
