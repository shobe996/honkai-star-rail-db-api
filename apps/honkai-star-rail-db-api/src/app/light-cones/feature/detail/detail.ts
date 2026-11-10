import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BadgeComponent, ButtonComponent } from '@honkai-star-rail-db/webkit';
import { Store } from '@ngrx/store';
import { lightConeSelectors } from '../../data-access/state/light-cone.selectors';


/**
 * Detail component for displaying light cone details.
 */
@Component({
  selector: 'app-detail-component',
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent {
  
  // Injected store for state management
  private _store = inject(Store);
  
  // Signal for the currently selected light cone
  lightCone = this._store.selectSignal(lightConeSelectors.selectLightCone)

  // Current level for displaying stats
  currentLevel: 'level1' | 'level80' = 'level80';


  // Getter for the active stats based on the current level
  get activeStats() {
    return this.lightCone()?.stats[this.currentLevel];
  }

  // Toggles the current level between level1 and level80
  toggleLevel(level: 'level1' | 'level80') {
    this.currentLevel = level;
  }
}
