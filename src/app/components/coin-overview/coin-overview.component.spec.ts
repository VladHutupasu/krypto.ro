import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinOverviewComponent } from './coin-overview.component';

describe('CoinOverviewComponent', () => {
  let component: CoinOverviewComponent;
  let fixture: ComponentFixture<CoinOverviewComponent>;

  beforeEach(async(() => {
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
