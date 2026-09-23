import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndButton } from './rnd-button';

describe('RndButton', () => {
  let component: RndButton;
  let fixture: ComponentFixture<RndButton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndButton],
    }).compileComponents();

    fixture = TestBed.createComponent(RndButton);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
