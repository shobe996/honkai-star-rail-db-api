import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

@Component({
  selector: 'lib-filter-bar',
  imports: [ButtonComponent],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent {
  resetFilters = output<void>();
}
