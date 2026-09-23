import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndAvatar } from './rnd-avatar';

describe('RndAvatar', () => {
  let component: RndAvatar;
  let fixture: ComponentFixture<RndAvatar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndAvatar],
    }).compileComponents();

    fixture = TestBed.createComponent(RndAvatar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
