import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CoinsTableComponent } from './coins-table.component';

describe('CoinsTableComponent', () => {
  let component: CoinsTableComponent;
  let fixture: ComponentFixture<CoinsTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
