import { Component, inject } from '@angular/core';
import { planarOrnamentSelectors } from '../../data-access/state/planar-ornament.selectors';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-detail-component',
  imports: [],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
})
export class DetailComponent {
  private _store = inject(Store);

  planarOrnament = this._store.selectSignal(planarOrnamentSelectors.selectPlanarOrnament)
}
