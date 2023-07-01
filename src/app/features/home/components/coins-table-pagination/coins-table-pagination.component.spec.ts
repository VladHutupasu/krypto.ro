import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinsTablePaginationComponent } from './coins-table-pagination.component';

describe('CoinsTablePaginationComponent', () => {
  let component: CoinsTablePaginationComponent;
  let fixture: ComponentFixture<CoinsTablePaginationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CoinsTablePaginationComponent]
    });
    fixture = TestBed.createComponent(CoinsTablePaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
