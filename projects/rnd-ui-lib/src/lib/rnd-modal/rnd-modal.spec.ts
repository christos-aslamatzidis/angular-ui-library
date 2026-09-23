import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndModal } from './rnd-modal';

describe('RndModal', () => {
  let component: RndModal;
  let fixture: ComponentFixture<RndModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndModal],
    }).compileComponents();

    fixture = TestBed.createComponent(RndModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
