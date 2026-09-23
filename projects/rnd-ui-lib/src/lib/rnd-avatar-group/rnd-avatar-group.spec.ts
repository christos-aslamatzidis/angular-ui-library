import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndAvatarGroup } from './rnd-avatar-group';

describe('RndAvatarGroup', () => {
  let component: RndAvatarGroup;
  let fixture: ComponentFixture<RndAvatarGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndAvatarGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(RndAvatarGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
