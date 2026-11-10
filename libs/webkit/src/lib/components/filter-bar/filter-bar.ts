import { ChangeDetectionStrategy, Component, output } from '@angular/core';
import { ButtonComponent } from '../button/button';

/*
Filter bar component for managing and resetting filters
*/
@Component({
  selector: 'lib-filter-bar',
  imports: [ButtonComponent],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterBarComponent {

  // Output event for resetting filters
  resetFilters = output<void>();
}
