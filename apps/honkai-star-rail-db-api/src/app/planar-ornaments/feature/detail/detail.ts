import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { planarOrnamentSelectors } from '../../data-access/state/planar-ornament.selectors';
import { Store } from '@ngrx/store';

/**
 * Detail component for displaying planar ornament information.
 */
@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {

  // Store instance for accessing application state.
  private _store = inject(Store);

  // Signal for the currently selected planar ornament.

  planarOrnament = this._store.selectSignal(planarOrnamentSelectors.selectPlanarOrnament)
}
