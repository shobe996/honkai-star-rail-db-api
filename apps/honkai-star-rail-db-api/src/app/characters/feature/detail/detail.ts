import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { BadgeComponent, ButtonComponent } from '@honkai-star-rail-db/webkit';
import { CharacterDetailFacadeService } from '../../data-access/character-detail.facade.service';

@Component({
  selector: 'app-detail-component',
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit {
  private _characterDetailFacadeService = inject(CharacterDetailFacadeService);
  currentLevel: 'level1' | 'level80' = 'level80';

  private _route = inject(ActivatedRoute);

  viewModel = toSignal(this._characterDetailFacadeService.viewModel$, {
    initialValue: { character: null },
  });

  ngOnInit(): void {
    const idString = this._route.snapshot.paramMap.get('id');
    if (idString) {
      const id = Number.parseInt(idString);
      this._characterDetailFacadeService.getById(id);
    }
  }

  get activeStats() {
    return this.viewModel().character?.stats[this.currentLevel];
  }

  toggleLevel(level: 'level1' | 'level80') {
    this.currentLevel = level;
  }
}
