import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
  OnInit,
} from '@angular/core';
import { BadgeComponent, ButtonComponent } from '@honkai-star-rail-db/webkit';
import { Store } from '@ngrx/store';
import { characterSelectors } from '../../data-access/state/character.selectors';
import { Router } from '@angular/router';

/**
 * Detail component for displaying character information.
 */
@Component({
  selector: 'app-detail-component',
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {

  // Injected router for navigation
  private _router = inject(Router);

  // Injected store for state management
  private _store = inject(Store);

  // Signal for the currently selected character
  character = this._store.selectSignal(characterSelectors.selectCharacter)

  // Current level for displaying stats
  currentLevel: 'level1' | 'level80' = 'level80';

  // Currently selected artwork index
  selectedArtIndex = signal(0);

  // Computed signal for the list of artworks
  artworks = computed(() => {
    const { splash_art_url, outfits } = this.character();
    return [splash_art_url, ...(outfits ?? [])].filter(Boolean);
  });

  // Computed signal for the currently active artwork
  activeArtwork = computed(() => {
    const arts = this.artworks();
    return arts[this.selectedArtIndex()] ?? arts[0];
  });

  // Method to select a specific artwork by index
  selectArtwork(index: number) {
    this.selectedArtIndex.set(index);
  }

  // Getter for the active stats based on the current level
  get activeStats() {
    return this.character().stats[this.currentLevel];
  }

  // Method to toggle the current level for displaying stats
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
