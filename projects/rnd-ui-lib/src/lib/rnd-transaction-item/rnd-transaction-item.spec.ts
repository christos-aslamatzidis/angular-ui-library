import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RndTransactionItem } from './rnd-transaction-item';

describe('RndTransactionItem', () => {
  let component: RndTransactionItem;
  let fixture: ComponentFixture<RndTransactionItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RndTransactionItem],
    }).compileComponents();

    fixture = TestBed.createComponent(RndTransactionItem);
    fixture.componentRef.setInput('direction', 'in');
    fixture.componentRef.setInput('title', 'Received');
    fixture.componentRef.setInput('amount', '0.01 BTC');
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
