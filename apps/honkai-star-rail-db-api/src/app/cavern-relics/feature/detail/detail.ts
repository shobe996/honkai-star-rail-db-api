import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { cavernRelicSelectors } from '../../data-access/state/cavern-relic.selectors';

@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class DetailComponent {
  private _store = inject(Store);

  cavernRelic = this._store.selectSignal(cavernRelicSelectors.selectCavernRelic)
}
