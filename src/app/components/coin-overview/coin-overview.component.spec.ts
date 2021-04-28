import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoinOverviewComponent } from './coin-overview.component';

describe('CoinOverviewComponent', () => {
  let component: CoinOverviewComponent;
  let fixture: ComponentFixture<CoinOverviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
