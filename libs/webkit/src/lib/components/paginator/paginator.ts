import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { SelectComponent } from '../select/select';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'lib-paginator',
  imports: [SelectComponent, ButtonComponent],
  templateUrl: './paginator.html',
  styleUrl: './paginator.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  total = input.required<number>();
  size = input.required<number>();
  page = input.required<number>();
  hasMore = input<boolean>(false);
  label = input<string>('Items');

  pageChange = output<number>();
  sizeChange = output<number>();

  Math = Math;
  lastPage = computed(() => Math.ceil(this.total() / this.size()));

  startRange = computed(() => (this.page() - 1) * this.size() + 1);
  endRange = computed(() => Math.min(this.page() * this.size(), this.total()));

  sizeSignal = computed(() => this.size().toString());

  pageSizeOptions = [
    { id: '10', name: '10' },
    { id: '20', name: '20' },
    { id: '50', name: '50' },
  ];

  handleSizeChange(newSize: string) {
    this.sizeChange.emit(Number(newSize));
  }
}
