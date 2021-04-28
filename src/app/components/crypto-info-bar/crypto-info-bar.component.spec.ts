import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CryptoInfoBarComponent } from './crypto-info-bar.component';

describe('CryptoInfoBarComponent', () => {
  let component: CryptoInfoBarComponent;
  let fixture: ComponentFixture<CryptoInfoBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptoInfoBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptoInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
