import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndRadioGroup } from './rnd-radio-group';

describe('RndRadioGroup', () => {
  let component: RndRadioGroup;
  let fixture: ComponentFixture<RndRadioGroup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndRadioGroup],
    }).compileComponents();

    fixture = TestBed.createComponent(RndRadioGroup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
