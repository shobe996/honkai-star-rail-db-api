import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { cavernRelicSelectors } from '../../data-access/state/cavern-relic.selectors';

/**
 * Detail component for displaying cavern relic information.
 */
@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {

  // Injected store for state management
  private _store = inject(Store);

  // Signal for the currently selected cavern relic
  cavernRelic = this._store.selectSignal(cavernRelicSelectors.selectCavernRelic)
}
