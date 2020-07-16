import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsTableComponent } from './coins-table.component';

describe('CoinsTableComponent', () => {
  let component: CoinsTableComponent;
  let fixture: ComponentFixture<CoinsTableComponent>;

  beforeEach(async(() => {
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
