import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndAssetRow } from './rnd-asset-row';

describe('RndAssetRow', () => {
  let component: RndAssetRow;
  let fixture: ComponentFixture<RndAssetRow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndAssetRow],
    }).compileComponents();

    fixture = TestBed.createComponent(RndAssetRow);
    fixture.componentRef.setInput('name', 'Bitcoin');
    fixture.componentRef.setInput('symbol', 'BTC');
    fixture.componentRef.setInput('balance', '0.42');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
