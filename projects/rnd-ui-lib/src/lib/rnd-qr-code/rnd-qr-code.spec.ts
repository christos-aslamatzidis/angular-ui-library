import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndQrCode } from './rnd-qr-code';

describe('RndQrCode', () => {
  let component: RndQrCode;
  let fixture: ComponentFixture<RndQrCode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndQrCode],
    }).compileComponents();

    fixture = TestBed.createComponent(RndQrCode);
    fixture.componentRef.setInput('value', 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
