import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndContextMenu } from './rnd-context-menu';

describe('RndContextMenu', () => {
  let component: RndContextMenu;
  let fixture: ComponentFixture<RndContextMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndContextMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(RndContextMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
