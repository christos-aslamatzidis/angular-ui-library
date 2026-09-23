import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndIcon } from './rnd-icon';
import { RND_ICON_PATHS } from './rnd-icon-registry';

describe('RndIcon', () => {
  let component: RndIcon;
  let fixture: ComponentFixture<RndIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndIcon],
    }).compileComponents();

    fixture = TestBed.createComponent(RndIcon);
    fixture.componentRef.setInput('name', 'check');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('every registered icon has non-empty outline, solid, and duotone markup', () => {
    for (const [name, entry] of Object.entries(RND_ICON_PATHS)) {
      expect(entry.outline.length, `${name} outline`).toBeGreaterThan(0);
      expect(entry.solid.length, `${name} solid`).toBeGreaterThan(0);
      expect(entry.duotone.length, `${name} duotone`).toBeGreaterThan(0);
    }
  });
});
