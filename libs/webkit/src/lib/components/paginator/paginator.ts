import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { SelectComponent } from '../select/select';
import { ButtonComponent } from '../button/button';

/**
 * Paginator component for handling pagination of items.
 * @total The total number of items to paginate.
 * @size The number of items per page.
 * @page The current page number.
 * @hasMore Indicates if there are more items to load.
 * @default false
 * @label The label for the items.
 * @default Items
 */
@Component({
  selector: 'lib-paginator',
  imports: [SelectComponent, ButtonComponent],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  
  // Total number of items to paginate
  total = input.required<number>();

  // Number of items per page
  size = input.required<number>();

  // Current page number
  page = input.required<number>();

  // Indicates if there are more items to load
  hasMore = input<boolean>(false);

  // Label for the items (e.g., "Items")
  label = input<string>('Items');

  // Event emitted when the current page changes
  pageChange = output<number>();

  // Event emitted when the page size changes
  sizeChange = output<number>();

  Math = Math;
  lastPage = computed(() => Math.ceil(this.total() / this.size()));

  // Computed signal for the start of the current range of items
  startRange = computed(() => (this.page() - 1) * this.size() + 1);

  // Computed signal for the end of the current range of items
  endRange = computed(() => Math.min(this.page() * this.size(), this.total()));

  // Computed signal for the current page size as a string
  sizeSignal = computed(() => this.size().toString());

  // Options for the page size select component
  pageSizeOptions = [
    { id: '9', name: '9' },
    { id: '18', name: '18' },
    { id: '45', name: '45' },
  ];

  // Handle changes to the page size
  handleSizeChange(newSize: string) {
    this.sizeChange.emit(Number(newSize));
  }
}
