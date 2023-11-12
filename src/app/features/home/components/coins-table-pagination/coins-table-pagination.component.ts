import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-coins-table-pagination',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, TranslateModule],
  templateUrl: './coins-table-pagination.component.html',
})
export class CoinsTablePaginationComponent {
  @Input() pageNumber!: number;
  @Output() nextPage: EventEmitter<void> = new EventEmitter();
  @Output() previousPage: EventEmitter<void> = new EventEmitter();

  next() {
    this.nextPage.emit();
  }

  previous() {
    this.previousPage.emit();
  }
}
