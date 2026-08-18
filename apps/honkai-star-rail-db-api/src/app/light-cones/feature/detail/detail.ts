import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { BadgeComponent, ButtonComponent } from '@honkai-star-rail-db/webkit';
import { LightConeDetailFacadeService } from '../../data-access/light-cone-detail-facade.service';

@Component({
  selector: 'app-detail-component',
  imports: [BadgeComponent, ButtonComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailComponent implements OnInit{
  private _lightConeDetailFacadeService = inject(LightConeDetailFacadeService);
  currentLevel: 'level1' | 'level80' = 'level80';

  private _route = inject(ActivatedRoute);

  viewModel = toSignal(this._lightConeDetailFacadeService.viewModel$, {
    initialValue: { lightCone: null },
  });

  ngOnInit(): void {
    const idString = this._route.snapshot.paramMap.get('id');
    if (idString) {
      const id = Number.parseInt(idString);
      this._lightConeDetailFacadeService.getById(id);
    }
  }

  get activeStats() {
    return this.viewModel().lightCone?.stats[this.currentLevel];
  }

  toggleLevel(level: 'level1' | 'level80') {
    this.currentLevel = level;
  }
}
