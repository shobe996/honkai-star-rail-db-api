import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { BadgeComponent, ButtonComponent } from '@honkai-star-rail-db/webkit';
import { Store } from '@ngrx/store';
import { characterSelectors } from '../../data-access/state/character.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-component',
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  private _router = inject(Router);
  private _store = inject(Store);
  character = this._store.selectSignal(characterSelectors.selectCharacter)
  currentLevel: 'level1' | 'level80' = 'level80';


  get activeStats() {
    return this.character().stats[this.currentLevel];
  }

  toggleLevel(level: 'level1' | 'level80') {
    this.currentLevel = level;
  }
  ngOnInit(): void {
    const keys = Object.keys(this.character()?.stats ?? {})
    if (!keys.length) {
      this._router.navigate(['character', 'list']);
    }
  }
}
