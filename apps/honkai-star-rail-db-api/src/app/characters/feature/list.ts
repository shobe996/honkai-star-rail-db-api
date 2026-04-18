import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Character, characterFilters } from 'honkai-star-rail-db';
import { BadgeComponent, CardComponent } from '@honkai-star-rail-db/webkit';

@Component({
  selector: 'app-list-component',
  imports: [CardComponent, BadgeComponent],
  templateUrl: './list.html',
  styleUrl: './list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent {
  toDetails(id: number) {
    console.log(id);
  }
  statsToggleState = new Map<number, 'level1' | 'level80'>();
  characters = characterFilters.all();

  toggleStats(characterId: number) {
    const current = this.statsToggleState.get(characterId) || 'level1';
    this.statsToggleState.set(characterId, current === 'level1' ? 'level80' : 'level1');
  }

  getStats(character: Character, id: number) {
    const level = this.statsToggleState.get(id) || 'level1';
    return character.stats[level];
  }
}
