import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BadgeComponent, ButtonComponent } from '@honkai-star-rail-db/webkit';
import { Store } from '@ngrx/store';
import { lightConeSelectors } from '../../data-access/state/light-cone.selectors';

@Component({
  selector: 'app-detail-component',
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  
  private _route = inject(ActivatedRoute);
  private _store = inject(Store);
  
  lightCone = this._store.selectSignal(lightConeSelectors.selectLightCone)
  currentLevel: 'level1' | 'level80' = 'level80';

  get activeStats() {
    return this.lightCone()?.stats[this.currentLevel];
  }

  toggleLevel(level: 'level1' | 'level80') {
    this.currentLevel = level;
  }
}
