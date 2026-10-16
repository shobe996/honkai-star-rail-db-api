import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';

import { CharacterService } from '../../characters/data-access/services/character.service';
import { Character } from 'honkai-star-rail-db/models';
export interface TeamMember {
  id: number;
  name: string;
  iconUrl: string;
  rarity: number;
}

export interface CharacterTeam {
  id: number;
  name: string;
  description?: string;
  members: Character[];
}
@Component({
  selector: 'app-home-component',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private router = inject(Router);
  private _characterService = inject(CharacterService);

  // Sample data signal — in a real app, this would come from a team service
  teams = signal<CharacterTeam[]>([
    this.buildTeam(1, 'DoT Archetype', 'Continuous damage setup', [791,1806,3885,1533]),
    this.buildTeam(2, 'Follow-Up Attack', 'Trigger follow-up attacks constantly for more damage', [2947,2366,3691,1920]),
    this.buildTeam(3, 'Rememberance', 'Summon allies to aid in battle', [3560,3956,4003,3688]),
    this.buildTeam(4, 'SP', 'Consume and regain Skill Points', [3768,5339,1807,3957]),
    this.buildTeam(5, 'Elation', 'Gather punchlines to power up damage during Aha instance', [4737,4997,4736,10192]),
    this.buildTeam(6, 'Nihility DPS', 'Debuff enemies to maximize damage', [1919,5217,10,3957]),
    this.buildTeam(7, 'Join Attack', '', [3767,5338,5217,1533]),
    this.buildTeam(8, 'Break', 'Break enemies and trigger Super break', [2494,3151,4060,2948]),
  ]);

  /** Navigates to the individual character detail page */
  navigateToCharacter(characterId: number): void {
    this.router.navigate(['/character/detail', characterId]);
  }

  buildTeam(
    id: number,
    name: string,
    description: string,
    membersIds: number[],
  ): CharacterTeam {
    const members: Character[] = [];
    for (const id of membersIds) {
      this._characterService.getById(id).subscribe({
        next: (character) => {
          if (character) members.push(character);
        },
      });
    }
    const team: CharacterTeam = {
      id: id,
      name: name,
      members: members,
      description: description
    };
    return team;
  }
}
